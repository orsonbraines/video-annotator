import sox
from pydub import AudioSegment
from google.cloud import speech

'''



'''

# convert from 2 channel to 1 channel. Replaces source file.


def stereoToMono(fileName):
    audio = AudioSegment.from_wav(fileName)
    audio = audio.set_channels(1)
    audio.export(fileName, format="wav")

# get the sample rate and channls


def getAudioInfo(filename):
    data = {}
    data['sample_rate'] = sox.file_info.sample_rate(filename)
    data['channels'] = sox.file_info.channels(filename)
    return data


def getTranscript(filename):
    client = speech.SpeechClient()

    # The name of the audio file to transcribe
    gcs_uri = f"gs://video-annotator/{filename}.wav"

    audio = speech.RecognitionAudio(uri=gcs_uri)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=48000,  # should be variable HERE
        language_code="en-US",
        enable_word_time_offsets=True,  # enable word "timestamps"
    )

    operation = client.long_running_recognize(config=config, audio=audio)

    print("Waiting for operation to complete...")
    result = operation.result(timeout=90)
    text = ""
    data = []
    for result in result.results:
        alternative = result.alternatives[0]
        # print("Transcript: {}".format(alternative.transcript))
        # print("Confidence: {}".format(alternative.confidence))

        for word_info in alternative.words:
            word = word_info.word
            start_time = word_info.start_time

            # print(
            #     f"Word: {word}, start_time: {start_time.total_seconds()}"
            # )
            data.append(
                (list(filter(None, "{}".format(result.alternatives[0].transcript).split(".")))))
            break
        text += (alternative.transcript + "\n")
    with open('text.txt', 'w') as output:
        output.write(text)

    return data


print(getTranscript('SundarPichai'))

# https://www.bing.com/videos/search?q=5+minute+speech+youtube&docid=607987998550403533&mid=9A1E97AACC2161DC96C79A1E97AACC2161DC96C7&view=detail&FORM=VIRE


