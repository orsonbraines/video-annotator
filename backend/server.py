from flask import Flask, jsonify, request
import yaml
import sys
from dotenv import load_dotenv
from backend.GoogleCloudStorageConnector import GoogleCloudStorageConnector


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
        video = request.get_json()
        db.create_video(video)
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


