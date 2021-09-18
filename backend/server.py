from flask import Flask, jsonify, request
import yaml
import sys
import os
from dotenv import load_dotenv
from backend.GoogleCloudStorageConnector import GoogleCloudStorageConnector
from werkzeug.utils import secure_filename
import uuid
from backend.utils import getVideoLength
import math


load_dotenv()

# local module
import backend.db as db

app = Flask(__name__)
app.debug = True

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
        # Saving the video file temporarily to local static folder
        local_video_filepath = os.path.join(app.root_path, 'static', filename)
        file.save(local_video_filepath)
        # Determining the video length
        video_length = math.floor(getVideoLength(local_video_filepath) * 1000)
        print(video_length)
        # Uploading video file to video-annotator bucket in Google Cloud Storage
        cloud_filename = str(uuid.uuid4())
        google_cloud_storage_connector.upload(cloud_filename, local_video_filepath)
        # Obtaining signed url of the video stored on cloud storage
        signed_url = google_cloud_storage_connector.generate_download_signed_url(cloud_filename)
        video = {'url': signed_url, 'name': filename, 'length': video_length}
        # Adding video to db
        db.create_video(video)
        # Deleting video file from local directory
        os.remove(local_video_filepath)
        # Return success response
        res = app.response_class(status=201)
        return res

@app.route("/videos/<video_id>/transcripts", methods=['GET','POST'])
def transcripts(video_id):
    if request.method == 'GET':
        return jsonify(db.get_transcripts(video_id))
    else:
        transcript = request.get_json()
        transcript['video_id'] = video_id
        db.create_transcript(transcript)
        res = app.response_class(status=201)
        return res

@app.route("/videos/<video_id>/annotations", methods=['GET','POST'])
def annotations(video_id):
    if request.method == 'GET':
        return jsonify(db.get_annotations(video_id))
    else:
        annotation = request.get_json()
        annotation['video_id'] = video_id
        db.create_annotation(annotation)
        res = app.response_class(status=201)
        return res


