let base_url = "";
if(process.env.NODE_ENV === 'production') {
  base_url = 'https://video-annotator-bfsgx2vx7q-uc.a.run.app';
}
else {
  base_url = 'http://localhost:8000';
}

export async function get_videos() {
  let res = await fetch(`${base_url}/videos`);
  let data = await res.json();
  console.log(data);
  return data;
}

export async function get_video(video_id) {
  let res = await fetch(`${base_url}/videos/${video_id}`);
  let data = await res.json();
  return data;
}

export async function upload_video(file) {
  let formData = new FormData();
  formData.append('file', file);
  let opts = {
    method: 'POST',
    body: formData
  };
  let res = await fetch(`${base_url}/videos`, opts);
  return await res.json();
}

export async function delete_video(video_id) {
  let opts = {
    method: 'DELETE'
  };
  let res = await fetch(`${base_url}/videos/${video_id}`, opts);
  return await res.json();
}

export async function get_transcripts(video_id) {
  let res = await fetch(`${base_url}/videos/${video_id}/transcripts`);
  let data = await res.json();
  return data;
}

export async function get_annotations(video_id) {
  let res = await fetch(`${base_url}/videos/${video_id}/annotations`);
  let data = await res.json();
  return data;
}

export async function upload_annotations(data) {
  let opts = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data),
  };
  let res = await fetch(`${base_url}/videos/${data.video_id}/annotations`, opts);
  return await res.json();
}

export async function delete_annotation(data) {
  let opts = {
    method: 'DELETE',
  };
  let res = await fetch(`${base_url}/videos/${data.video_id}/annotations/${data.annotation_id}`, opts);
  return await res.json();
}

export async function edit_annotation(annotation) {
  let opts = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(annotation)
  }
  let res = await fetch(`${base_url}/videos/${annotation.video_id}/annotations/${annotation.id}`, opts)
  return await res.json();
}

export async function edit_transcript(transcript) {
  let opts = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(transcript)
  }
  let res = await fetch(`${base_url}/videos/${transcript.video_id}/transcripts/${transcript.id}`, opts)
  return await res.json();
}
