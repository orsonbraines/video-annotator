let base_url = 'http://localhost:8000' // change depending on server location 

export async function get_videos() {
  let res = await fetch(`${base_url}/videos`);
  let data = await res.json();
  console.log(data);
  return data
}

export async function get_video(video_id) {
  let res = await fetch(`${base_url}/videos/${video_id}`);
  let data = await res.json();
  return data
}

export async function upload_video(file) {
  let formData = new FormData();
  formData.append('file', file);
  let opts = {
    method: 'POST',
    body: formData
  };
  let res = await fetch(`${base_url}/videos`, opts);
  return true;
}
export async function get_transcripts(video_id) {
  let res = await fetch(`${base_url}/videos/${video_id}/transcripts`);
  let data = await res.json();
  return data
}

export async function get_annotations(video_id) {
  let res = await fetch(`${base_url}/videos/${video_id}/annotations`);
  let data = await res.json();
  return data
}
