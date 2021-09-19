import React from 'react';
import './Transcript.css';

export default function Transcript(props) {
  return (
    <div className='transcript' style={props.highlighted?{'backgroundColor':'yellow'} : {}}>
      <span><button onClick={() => props.setSeekTime(props.transcript.ts / 1000.0)}>{props.transcript.ts}</button></span>
      <span className="transcriptTxt">{props.transcript.txt}</span>
    </div>
  );
}
