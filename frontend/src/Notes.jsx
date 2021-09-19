import React, { useState } from "react";
import Annotation from "./Annotation";
import "./Notes.css";
import { upload_annotations} from './jsonapi';


export default function VideoText(props) {
  const [msg, setMsg] = useState("");
  const id = "32424242";
  const video_id = "694439132509415185";
  const ts = 4000;

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      "video_id": video_id,
      "ts": ts,
      "msg": msg
    };
    upload_annotations(data);
  };

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
