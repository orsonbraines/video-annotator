import React, { useState } from 'react';
import './Transcript.css';
import { edit_transcript } from './jsonapi';

export default function Transcript(props) {
  const [isEditing, setEditing] = useState(false);
  const [editedTxt, setEditedTxt] = useState('');
  
  const editTranscript = () => {
    const data = {...props.transcript};
    data.txt = editedTxt;
    edit_transcript(data);
    props.setTxt(data.txt);
    setEditing(false);
    setEditedTxt(data.txt);
  };

  return (
    <div className='transcript' style={props.highlighted?{'backgroundColor':'rgb(251,236,93)', 'padding': '1px 4px 1px 1px', 'borderRadius': '5px'} : {}}>
      <span><button className="ts-btn" onClick={() => props.setSeekTime(props.transcript.ts / 1000.0)}>{`${String(Math.floor(props.transcript.ts / 60000)).padStart(2,'0')}:${String(Math.floor((props.transcript.ts - 60000 * Math.floor(props.transcript.ts / 60000)) / 1000)).padStart(2,'0')}`}</button></span>
      {isEditing?
        <textarea  className="transcriptTxt"
                    type='text' 
                    onChange={(e) => {setEditedTxt(e.target.value);}} 
                    onBlur={() => setEditing(false)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        editTranscript();
                      }
                    }}
                    cols='40'
                    rows={Math.ceil(editedTxt.length / 40)+1}
                    value={editedTxt}/>
        : <span className="transcriptTxt"
                onDoubleClick={() => {
                    setEditedTxt(props.transcript.txt);
                    setEditing(true);
                  }
                }>{props.transcript.txt}</span>
      }
    </div>
  );
}
