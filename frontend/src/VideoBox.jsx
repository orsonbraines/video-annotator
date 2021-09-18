import React from 'react';
import './VideoBox.css';


const VideoBox = (props) => {
  return (
    <div id='videoContainer'>
      {props.video && `Video id: ${props.video.id}. This is the video div.`}
    </div>
  );
}

export default VideoBox;
