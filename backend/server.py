from flask import Flask, jsonify, request
from flask_cors import CORS
import yaml
import sys
import os
from dotenv import load_dotenv
from backend.GoogleCloudStorageConnector import GoogleCloudStorageConnector
from werkzeug.utils import secure_filename
import uuid
from backend.utils import getVideoLength, downloadVideoThumbnail, getAudioFromVideo, transformTranscriptsForDb
import math
from backend.audioTranscript import getTranscript
import tempfile


load_dotenv()

# local module
import backend.db as db

app = Flask(__name__)
CORS(app)

# init db
with open('config.yml', 'r') as file:
    config = yaml.safe_load(file)
    db.init_conn(config['db_dsn'])

# init Google Cloud Storage Connector
BUCKET_NAME = "video-annotator"
google_cloud_storage_connector = GoogleCloudStorageConnector(BUCKET_NAME)


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/videos", methods=['GET','POST'])
def videos():
    if request.method == 'GET':
        return jsonify(db.get_videos())
    else:
        file = request.files['file']
        filename = secure_filename(file.filename)
        video_uuid = str(uuid.uuid4())
        # Creating temporary local folder to store video and thumbnail files
        temp_local_folder = tempfile.TemporaryDirectory()
        # Saving the video file temporarily to static/<video_uuid> folder
        local_video_filepath = os.path.join(temp_local_folder.name, filename)
        file.save(local_video_filepath)
        video_length = math.floor(getVideoLength(local_video_filepath) * 1000)
        # Getting audio from video
        local_audio_filepath = os.path.join(temp_local_folder.name, 'audio.wav')
        getAudioFromVideo(local_video_filepath, local_audio_filepath)
        # Getting video thumbnail
        local_thumbnail_filepath = os.path.join(temp_local_folder.name, 'thumbnail.jpg')
        downloadVideoThumbnail(local_video_filepath, local_thumbnail_filepath)
        
        # Uploading video file to Google Cloud Storage
        cloud_video_path = f"{video_uuid}/{filename}"
        google_cloud_storage_connector.upload(cloud_video_path, local_video_filepath)
        # Uploading audio file to Google Cloud Storage
        cloud_audio_path = f"{video_uuid}/audio.wav"
        google_cloud_storage_connector.upload(cloud_audio_path, local_audio_filepath)
        # Uploading video thumbnail to Google Cloud Storage
        cloud_thumbnail_path = f"{video_uuid}/thumbnail.jpg"
        google_cloud_storage_connector.upload(cloud_thumbnail_path, local_thumbnail_filepath)
        # Obtaining signed url of the video and thumbnail stored on cloud storage
        video_url = google_cloud_storage_connector.generate_download_signed_url(cloud_video_path)
        thumbnail_url = google_cloud_storage_connector.generate_download_signed_url(cloud_thumbnail_path)
        video = {'video_url': video_url, 'thumbnail_url': thumbnail_url, 'name': filename, 'length': video_length}
        # Obtaining transcript
        transcript = getTranscript(cloud_audio_path)
        print(transcript)
        # Adding video to db
        video_id = db.create_video(video)
        # Add transcripts for video to db
        db.create_transcripts(transformTranscriptsForDb(transcript, video_id))
        # Deleting temporary video folder from local directory
        temp_local_folder.cleanup()
        # Return success response
        return app.make_response((jsonify(db.get_videos()),201))

@app.route("/videos/<video_id>")
def video(video_id):
    vid = db.get_video(video_id)
    if vid == None:
        return app.make_response(({'msg': f'video {video_id} not found'}, 404))

    return jsonify(vid)

@app.route("/videos/<video_id>/transcripts", methods=['GET', 'POST'])
def transcripts(video_id):
    if request.method == 'GET':
        return jsonify(db.get_transcripts(video_id))
    else:
        transcript = request.get_json()
        transcript['video_id'] = video_id
        db.create_transcript(transcript)
        return app.make_response((jsonify(db.get_transcripts(video_id)),201))

@app.route("/videos/<video_id>/annotations", methods=['GET','POST'])
def annotations(video_id):
    if request.method == 'GET':
        return jsonify(db.get_annotations(video_id))
    else:
        annotation = request.get_json()
        print(annotation)
        annotation['video_id'] = int(video_id)
        db.create_annotation(annotation)
        return app.make_response((jsonify(db.get_annotations(video_id)),201))

@app.route("/videos/<video_id>/annotations/<annotation_id>", methods=['DELETE'])
def deleteAnnotations(video_id, annotation_id):
    db.delete_annotation(annotation_id)
    return app.make_response((jsonify(db.get_annotations(video_id)),201))