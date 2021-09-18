import React from 'react';
import { Player, BigPlayButton } from 'video-react';
import "../node_modules/video-react/dist/video-react.css";
import './VideoBox.css';


const VideoBox = (props) => {
  return (
    <div id='videoContainer'>
      {props.video && 
        <Player>
          <source src={props.video.video_url}/>
          <BigPlayButton position="center" />
        </Player>}
    </div>
  );
}

export default VideoBox;
