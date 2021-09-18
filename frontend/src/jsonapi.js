let base_url = 'http://localhost:5000'

export async function get_videos() {
  let res = await fetch(`${base_url}/videos`);
  let data = await res.json();
  let data2 = []
  for (const o in data)
    data2.push(o);
  console.log(data.length);
  console.log(data2.length);
  console.log(typeof data);
  console.log(typeof data2);
  return data
}
