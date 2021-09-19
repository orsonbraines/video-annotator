import React from 'react';
import './Transcript.css';

export default function Transcript(props) {
  return (
    <div className='transcript' style={props.highlighted?{'backgroundColor':'yellow'} : {}}>
      <span><button onClick={() => props.setSeekTime(props.transcript.ts / 1000.0)}>{`${String(Math.floor(props.transcript.ts / 60000)).padStart(2,'0')}:${String(Math.floor((props.transcript.ts - 60000 * Math.floor(props.transcript.ts / 60000)) / 1000)).padStart(2,'0')}`}</button></span>
      <span className="transcriptTxt">{props.transcript.txt}</span>
    </div>
  );
}
