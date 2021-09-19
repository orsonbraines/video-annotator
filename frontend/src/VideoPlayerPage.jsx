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

  const [transcripts, setTranscripts] = useState([]);

  const [annotations, setAnnotations] = useState([]);

  const [seekTime, setSeekTime] = useState(-1);

  const [searchStr, setSearchStr] = useState('');

  const [videoPlayer, setVideoPlayer] = useState(null);

  const [recalculate, setReclculate] = useState(false);

  const [highlightTranscriptId, setHighlightTranscriptId] = useState(null);

  useEffect(() => get_video(id).then(data => {
    setVideo(data);
    setTranscripts(data.transcripts);
    setAnnotations(data.annotations);
  }), []);

  const getCurrentTranscript = () => {
    if(!videoPlayer || !video || transcripts.length < 1) {
      return;
    }
    const currTs = videoPlayer.getState().player.currentTime * 1000;
    let id = transcripts[0].id;
    for(let i = 1; i < transcripts.length; ++i) {
      if(transcripts[i].ts < currTs)
        id = transcripts[i].id;
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
      <h2>Video Title</h2>
        <div id='upper'>
          <VideoBox video_url={video ? video.video_url : null} 
                    seekTime={seekTime} 
                    setSeekTime={setSeekTime}
                    videoPlayer={videoPlayer}
                    setVideoPlayer={setVideoPlayer}/>
          <VideoText  transcripts={transcripts} 
                      setSeekTime={setSeekTime}
                      searchStr={searchStr}
                      setSearchStr={setSearchStr}
                      highlightTranscriptId={highlightTranscriptId}/>
        </div>
        <div id='lower'>
          <Notes annotations={annotations} 
                  setSeekTime={setSeekTime}
                  video_id={id}
                  videoPlayer={videoPlayer}
                  setAnnotations={setAnnotations}/>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
