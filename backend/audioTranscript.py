
# Imports the Google Cloud client library
from google.cloud import speech


# Instantiates a client
client = speech.SpeechClient()

# The name of the audio file to transcribe
gcs_uri = "gs://video-annotator/test_1.wav"

audio = speech.RecognitionAudio(uri=gcs_uri)

config = speech.RecognitionConfig(
    encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
    sample_rate_hertz=16000,
    language_code="en-US",
    enable_word_time_offsets=True,
)

# # Detects speech in the audio file
# response = client.recognize(config=config, audio=audio)

# for result in response.results:
#     print("Transcript: {}".format(result.alternatives[0].transcript))
# # Imports the Google Cloud client library

operation = client.long_running_recognize(config=config, audio=audio)

print("Waiting for operation to complete...")
result = operation.result(timeout=90)

for result in result.results:
    alternative = result.alternatives[0]
    print("Transcript: {}".format(alternative.transcript))
    print("Confidence: {}".format(alternative.confidence))

    for word_info in alternative.words:
        word = word_info.word
        start_time = word_info.start_time
        end_time = word_info.end_time
        

        print(
            f"Word: {word}, start_time: {start_time.total_seconds()}, end_time: {end_time.total_seconds()}"
        )
        break
