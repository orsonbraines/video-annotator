import React, { useEffect, useState } from 'react';
import { get_videos } from './jsonapi';
import './VideoLibrary.css';
import './Video.css';
import { Link } from 'react-router-dom';

export default function VideoLibrary() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    get_videos().then(data => {
      setVideos(data);
    });
  }, []);

  let videoTiles = videos.map(video => 
    (<Video key={video.id} id={video.id} name={video.name} vidlen={video.length}/>)
  );

  return (
    <div>
      <div id='topContainer'>
        <h1 id='title'>Video Library</h1>
        <button id='addBtn'>
          <span><ion-icon name="add-outline"></ion-icon></span>
          <span>Add</span>
        </button>
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
