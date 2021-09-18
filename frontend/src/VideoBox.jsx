import React from 'react';
import './VideoBox.css';
import { useParams } from "react-router-dom";


const VideoBox = () => {
  const {id} = useParams();
  return (
    <div id='videoContainer'>
      Video id: {id}. This is the video div.
    </div>
  );
}

export default VideoBox;
