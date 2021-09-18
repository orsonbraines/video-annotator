import React, { useRef, useState, useEffect } from 'react';
import { Player, BigPlayButton } from 'video-react';
import "../node_modules/video-react/dist/video-react.css";
import './VideoBox.css';


const VideoBox = (props) => {
  let playerRef = useRef(null);

  useEffect(() => {
    if(playerRef && props.seekTime >= 0) {
      playerRef.seek(props.seekTime);
      props.setSeekTime(-1);
    }
  }, [props.seekTime]);

  return (
    <div id='videoContainer'>
      {props.video && 
        <Player ref={player => playerRef = player}>
          <source src={props.video.video_url}/>
          <BigPlayButton position="center" />
        </Player>}
    </div>
  );
}

export default VideoBox;
