import React from 'react';
import './VideoLibrary.css';
import './Video.css'

export default function VideoLibrary() {
  return (
    <div>
      <div className='topContainer'>
        <h1 id='title'>Video Library</h1>
        <hr/>
      </div>
      <div id='videosContainer'>
        <Video />
      </div>
    </div>
  );
}

function Video() {
  return (
    <div>
      <div id='img'></div>
      <div id='videoInfo'>
        <h2>Video Name</h2>
        <p id='description'>This is where the video description will go.</p>
      </div>
    </div>
  );
}