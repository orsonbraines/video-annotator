import React, { useState, useEffect} from 'react';
import './VideoBox.css';
import './VideoPlayerPage.css';
import { useParams } from "react-router-dom";
import VideoBox from './VideoBox.jsx';
import VideoText from './VideoText.jsx';
import Header from './Header.jsx';
import Notes from './Notes.jsx';
import { get_video } from './jsonapi';

const VideoPlayer = () => {
  const {id} = useParams();

  const [video, setVideo] = useState(null);

  const [seekTime, setSeekTime] = useState(-1);

  useEffect(() => get_video(id).then(data => {
    setVideo(data);
  }), []);
  
  return (
    <div style={{height: "auto"}}>
      <Header />
      <div className="mainContainer">
      <h2>Video Title</h2>
        <div id='upper'>
          <VideoBox video={video} seekTime={seekTime} setSeekTime={setSeekTime}/>
          <VideoText transcripts={video ? video.transcripts : []} setSeekTime={setSeekTime}/>
        </div>
        <div id='lower'>
          <Notes annotations={video ? video.annotations : []} setSeekTime={setSeekTime}/>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
