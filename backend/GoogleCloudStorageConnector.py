import os
import datetime
from google.cloud import storage


class GoogleCloudStorageConnector(object):
    def __init__(self, bucket_name):
        self.bucket_name = bucket_name
        self.storage_client = storage.Client()
        self.video_annotator_bucket = self.storage_client.get_bucket(bucket_name)
    
    def upload(self, blob_name, from_file_path):
        blob = self.video_annotator_bucket.blob(blob_name)
        filename, file_extension = os.path.splitext(from_file_path)
        blob.metadata = {'file extension': file_extension}
        blob.upload_from_filename(from_file_path)

    def download(self, blob_name, destination_path):
        blob = self.video_annotator_bucket.get_blob(blob_name)
        with open(destination_path, 'wb') as f:
            self.storage_client.download_blob_to_file(blob, f)
    
    def _getBlobsWithPrefix(self, prefix):
        return self.storage_client.list_blobs(self.video_annotator_bucket, prefix=prefix)
    
    def delete(self, prefix):
        for blob in self._getBlobsWithPrefix(prefix):
            blob.delete()

    def generate_download_signed_url(self, blob_name):
        blob = self.video_annotator_bucket.blob(blob_name)
        expiration_period = datetime.timedelta(days=7)
        url = blob.generate_signed_url(
            version="v4",
            expiration=expiration_period,
            method="GET"
        )
        return url
        