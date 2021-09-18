import React from 'react';
import './VideoText.css';
import Transcript from './Transcript';

export default function VideoText(props) {
  return (
    <div id='textContainer'>
      <div id='searchContainer'>
        <input type='text' placeholder='Search' id='searchBar'></input>
      </div>
      <div id='subtitles'>
        {props.transcripts.map(t => (
          <Transcript key={t.id} transcript={t} setSeekTime={props.setSeekTime}></Transcript>
        ))}
      </div>
    </div>
  );
}
