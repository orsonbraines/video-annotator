import React, { useEffect, useState } from 'react';
import { get_videos } from './jsonapi';
import './VideoLibrary.css';
import './Video.css'

export default function VideoLibrary() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    get_videos().then(data => {
      setVideos(data);
    });
  }, []);

  let videoTiles = videos.map(video => 
    (<Video key={video.id} id={video.id} name={video.name} url={video.url}/>)
  );

  return (
    <div>
      <div className='topContainer'>
        <h1 id='title'>Video Library</h1>
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
    <div className='videoTile'>
      <div class='img'></div>
      <div class='videoInfo'>
        <h2>{props.name}</h2>
        <p class='description'>{props.url}</p>
      </div>
    </div>
  );
}
