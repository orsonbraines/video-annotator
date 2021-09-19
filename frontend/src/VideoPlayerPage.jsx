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

  const [searchStr, setSearchStr] = useState('');

  const [videoPlayer, setVideoPlayer] = useState(null);

  const [recalculate, setReclculate] = useState(false);

  const [highlightTranscriptId, setHighlightTranscriptId] = useState(null);
  const [name, setName] = useState('My Video');

  useEffect(() => get_video(id).then(data => {
    setVideo(data);
    setName(video.name);
  }), []);
  
  const getCurrentTranscript = () => {
    if(!videoPlayer || !video || video.transcripts.length < 1) {
      return;
    }
    const currTs = videoPlayer.getState().player.currentTime * 1000;
    let id = video.transcripts[0].id;
    for(let i = 1; i < video.transcripts.length; ++i) {
      if(video.transcripts[i].ts < currTs)
        id = video.transcripts[i].id;
      else break;
    }
    return id;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setReclculate(true);
    }, 250);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if(recalculate) {
      setHighlightTranscriptId(getCurrentTranscript());
      setReclculate(false);
    }
  }, [recalculate])
  
  return (
    <div style={{height: "auto"}}>
      <Header />
      <div className="mainContainer">
      <h2 id="title">{name}</h2> 
        <div id='upper'>
          <VideoBox video={video} 
                    seekTime={seekTime} 
                    setSeekTime={setSeekTime}
                    videoPlayer={videoPlayer}
                    setVideoPlayer={setVideoPlayer}/>
          <VideoText transcripts={video ? video.transcripts : []} 
                      setSeekTime={setSeekTime}
                      searchStr={searchStr}
                      setSearchStr={setSearchStr}
                      highlightTranscriptId={highlightTranscriptId}/>
        </div>
        <div id='lower'>
          <Notes annotations={video ? video.annotations : []} setSeekTime={setSeekTime}/>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
