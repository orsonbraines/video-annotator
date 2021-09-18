import React from 'react';
import './VideoLibrary.css';
import './Video.css';
import { Link } from 'react-router-dom';

export default function VideoLibrary() {
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
        <Video />
      </div>
    </div>
  );
}

function Video() {
  let id = 1;
  return (
    <div id='videoDiv'>
      <Link to = {`/videoPlayer/${id}`}>
        <div id='img'></div>
        <div id='videoInfo'>
          <h2 id='name'>Video Name</h2>
          <p id='description'>This is where the video description will go.</p>
        </div>
      </Link>
    </div>
  );
}