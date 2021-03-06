import React, { useEffect, useState } from 'react';
import { get_videos, upload_video, delete_video } from './jsonapi';
import './VideoLibrary.css';
import './Video.css';
import { Link } from 'react-router-dom';
import DeleteButton from './DeleteButton';


export default function VideoLibrary() {
  const [videos, setVideos] = useState([]);
  const [file, setFile] = useState("");
  const [uploading, setUploading] = useState(false);

  //get video list from db
  useEffect(() => {
    get_videos().then(data => {
      setVideos(data);
    });
  }, []);

  //maps videos to dom components
  let videoTiles = videos.map(video => 
    (<Video key={video.id} id={video.id} name={video.name} vidlen={video.length} thumbnail={video.thumbnail_url} setVideos={setVideos}/>)
  );

  function FileUpload(event) {
      event.preventDefault();
      setFile(event.target.files[0]);
      setUploading(true);
      upload_video(event.target.files[0])
        .then((data) => {
          setUploading(false);
          setVideos(data);
        });
      console.log(event.target.files[0]);
  }


  return (
    <div className='mainContainer'>
      <div id='topContainer'>
        <h1 id='title'>Video Library</h1>
        <label htmlFor="addBtn" className="file-upload">
          <span><ion-icon name="add-outline" /></span>
          {uploading ? 'Uploading' : 'Upload'} 
        </label>
        <input type='file' id='addBtn' accept="video/*" onChange={FileUpload} />
        <hr/>
      </div>
      <div id='videosContainer'>
        {videoTiles}
      </div>
    </div>
  );
}

function Video(props) {
  return (
    <Link to = {`/videoPlayer/${props.id}`}>
      <div className='videoTile'>
        <div className='thumbnail'><img src={props.thumbnail} alt="" /></div>
        <div className='videoInfo'>
          <h2>{props.name}</h2>
          <p id='description'>{`${String(Math.floor(props.vidlen / 60000)).padStart(2,'0')}:${String(Math.floor((props.vidlen - 60000 * Math.floor(props.vidlen / 60000)) / 1000)).padStart(2,'0')}`}</p>
        </div>
        <div style={{'marginTop':'10px', 'marginRight': '10px'}}>
          <DeleteButton doDelete={(e) => {
            e.preventDefault();
            delete_video(props.id).then(data => props.setVideos(data));
          }}/>
        </div>
      </div>
    </Link>
  );
}
