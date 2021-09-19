import React from 'react';
import './VideoText.css';
import Transcript from './Transcript';

export default function VideoText(props) {
  return (
    <div id='textContainer'>
      <div id='searchContainer'>
        <input type='text' 
                placeholder='  Search in the transcript...' 
                id='searchBar' 
                value={props.searchStr}
                onChange={(e) => props.setSearchStr(e.target.value)}></input>
      </div>
      <div id='subtitles'>
        {props.transcripts
          .filter(t => t.txt.includes(props.searchStr))
          .map(t => (
          <Transcript key={t.id} 
                      transcript={t} 
                      setSeekTime={props.setSeekTime} 
                      highlighted={props.highlightTranscriptId === t.id}
                      setTxt={(txt)=>{
                        let transcriptsCopy = [...props.transcripts];
                        for(let copyTranscript of transcriptsCopy) {
                          if(copyTranscript.id === t.id) {
                            copyTranscript.txt = txt;
                          }
                        }
                        props.setTranscripts(transcriptsCopy);
                      }} />
        ))}
      </div>
    </div>
  );
}
