import React from 'react';
import Annotation from './Annotation';
import './Notes.css';

export default function VideoText(props) {
  return (
    <div id='notesContainer'>
      <div id='notes'>Notes</div>
      <div id='notesDisplay'>
        {props.annotations.map((a) => (
          <Annotation key={a.id} annotation = {a} setSeekTime={props.setSeekTime}/>
        ))}
      </div>
    </div>
  );
}
