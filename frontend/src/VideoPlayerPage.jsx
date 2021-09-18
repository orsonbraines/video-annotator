import React, {useEffect, useState} from 'react';
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

  useEffect(() => get_video(id).then(data => setVideo(data)), []);

  return (
    <div>
      <Header />
      <div id='upper'>
        <VideoBox video={video}/>
        <VideoText />
      </div>
      <div id='lower'>
        <Notes />
      </div>
    </div>
  );
}

export default VideoPlayer;
