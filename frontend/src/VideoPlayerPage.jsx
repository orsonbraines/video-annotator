import React from 'react';
import './VideoBox.css';
import './VideoPlayerPage.css';
import { useParams } from "react-router-dom";
import VideoBox from './VideoBox.jsx';
import VideoText from './VideoText.jsx';
import Header from './Header.jsx';
import Notes from './Notes.jsx';


const VideoPlayer = () => {
  return (
    <div>
      <Header />
      <div id='upper'>
        <VideoBox />
        <VideoText />
      </div>
      <div id='lower'>
        <Notes />
      </div>
    </div>
  );
}

export default VideoPlayer;