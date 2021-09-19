import React, { useRef, useState, useEffect } from 'react';
import { Player, BigPlayButton } from 'video-react';
import "../node_modules/video-react/dist/video-react.css";
import './VideoBox.css';
import { useParams } from "react-router-dom";


const VideoBox = (props) => {
  useEffect(() => {
    if(props.videoPlayer && props.seekTime >= 0) {
      props.videoPlayer.seek(props.seekTime);
      props.setSeekTime(-1);
    }
  }, [props.seekTime]);

  return (
    <div id='videoContainer'>
      {props.video_url && 
        <Player ref={player => props.setVideoPlayer(player)}>
          <source src={props.video_url}/>
          <BigPlayButton position="center" />
        </Player>}
    </div>
  );
}

export default VideoBox;
