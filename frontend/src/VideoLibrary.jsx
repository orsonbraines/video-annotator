import React, { useEffect, useState } from 'react';
import { get_videos, upload_video } from './jsonapi';
import './VideoLibrary.css';
import './Video.css';
import { Link } from 'react-router-dom';

/*function FileUpload() {
  const [file, setFile] = useState("");

  function handleUpload(event) {
    setFile(event.target.files[0]);
  }

  return (
    <div>
      <input type='file' />
    </div>
  );
}*/

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
    (<Video key={video.id} id={video.id} name={video.name} vidlen={video.length}/>)
  );

  function FileUpload(event) {
      event.preventDefault();
      setFile(event.target.files[0]);
      setUploading(true);
      upload_video(event.target.files[0])
        .then(() => setUploading(false));
      console.log(event.target.files[0]);
  }


  return (
    <div id='mainContainer' >
        <div id='topContainer'>
          <h1 id='title'>Video Library</h1>
          <label htmlFor="addBtn" className="file-upload">
            <span><ion-icon name="add-outline"></ion-icon></span>
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
        <div className='img'></div>
        <div className='videoInfo'>
          <h2>{props.name}</h2>
          <p className='description'>{props.vidlen}</p>
        </div>
      </div>
    </Link>
  );
}
