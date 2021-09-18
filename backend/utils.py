import subprocess
import os

def getVideoLength(filepath):
    command = ["ffprobe", "-v", "error", "-show_entries", "format=duration", 
               "-of", "default=noprint_wrappers=1:nokey=1", filepath]
    result = subprocess.run(
        command, 
        stdout=subprocess.PIPE, 
        stderr=subprocess.STDOUT
    )
    return float(result.stdout)

def downloadVideoThumbnail(video_filepath, destination):
    command = ['ffmpeg', '-i', video_filepath, '-ss', '00:00:00.000', 
               '-vframes', '1', destination]
    subprocess.call(command)

def getAudioFromVideo(video_filepath, destination):
    command = ['ffmpeg', '-i', video_filepath, '-ab', '160k', '-ac',
               '1', '-ar', '48000', '-vn', destination]
    subprocess.call(command)

def transformTranscriptsForDb(transcript, video_id):
    res = []
    for tsStr in transcript:
        res.append((video_id, int(float(tsStr) * 1000), transcript[tsStr]))
    return res
