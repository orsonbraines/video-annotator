import React from "react";
import Annotation from "./Annotation";
import "./Notes.css";

export default function VideoText(props) {
  return (
    <div id="notesContainer">
      <div className="annotations">
        <h2 id="notes">Notes</h2>
        <div id="notesDisplay">
          {props.annotations.map((a) => (
            <Annotation
              key={a.id}
              annotation={a}
              setSeekTime={props.setSeekTime}
            />
          ))}
        </div>
      </div>
      <form id='noteInput'>
        <input type='text' placeholder='Start typing a note...' id='addNote'></input>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}
