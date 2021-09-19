import React, { useState } from "react";
import Annotation from "./Annotation";
import "./Notes.css";
import { upload_annotations} from './jsonapi';


export default function VideoText(props) {
  const [msg, setMsg] = useState("");
  const video_id = props.video_id;

  const handleSubmit = (e) => {
    e.preventDefault();
    const ts = Math.floor(props.videoPlayer.getState().player.currentTime * 1000)
    const data = {
      "video_id": video_id,
      "ts": ts,
      "msg": msg
    };
    upload_annotations(data).then(res => {
      props.setAnnotations(res);
    });
  };

  return (
    <div id="notesContainer">
      <h2 id="notes">Notes</h2>
      <hr/>
      <div className="annotations">
        <div id="notesDisplay">
          {props.annotations.map((a) => (
            <Annotation
              key={a.id}
              annotation={a}
              setSeekTime={props.setSeekTime}
              setAnnotations={props.setAnnotations}
              setMsg={(msg) => {
                let annotationsCopy = [...props.annotations];
                for(let copyAnnotation of annotationsCopy) {
                  if(copyAnnotation.id === a.id) {
                    console.log('MATCH!')
                    copyAnnotation.msg = msg;
                  }
                }
                props.setAnnotations(annotationsCopy);
              }}
              video_id={video_id}
            />
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} id="noteInput">
        <input
          type="text"
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Start typing a note..."
          id="addNote"
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
