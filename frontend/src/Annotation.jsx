import React, { useState } from 'react';
import './Annotation.css';
import { delete_annotation, edit_annotation } from './jsonapi';
import DeleteButton from "./DeleteButton";

export default function Annotation(props) {
  const onClick = () => {
    const data = {
      "video_id": props.video_id,
      "annotation_id": props.annotation.id
    };
    delete_annotation(data).then(res => {
      props.setAnnotations(res)
    })
  }

  const [isEditing, setEditing] = useState(false);
  const [editedMsg, setEditedMsg] = useState('');

  const editAnnotation = () => {
    const data = {...props.annotation};
    data.msg = editedMsg;
    edit_annotation(data);
    props.setMsg(data.msg);
    setEditing(false);
    setEditedMsg(data.msg);
  };

  return (
    <div className='annotation'>
      <span><button className="ts-btn" onClick={() => props.setSeekTime(props.annotation.ts / 1000.0)}>{`${String(Math.floor(props.annotation.ts / 60000)).padStart(2,'0')}:${String(Math.floor((props.annotation.ts - 60000 * Math.floor(props.annotation.ts / 60000)) / 1000)).padStart(2,'0')}`}</button></span>
     { isEditing ?
          <textarea type='text' 
                  className="annotationMsg"
                  onChange={(e) => {setEditedMsg(e.target.value);}} 
                  onBlur={() => setEditing(false)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      editAnnotation();
                    }
                  }}
                  value={editedMsg}
                  cols={60}
                  rows={Math.ceil(editedMsg.length / 60) + 1}/>
        : <span className="annotationMsg" 
                onDoubleClick={() => {
                  setEditedMsg(props.annotation.msg);
                  setEditing(true);
                }
        }>{props.annotation.msg}</span>}
      <span className="deleteButtonSpan"><DeleteButton doDelete={onClick}/></span>
    </div>
  );
}
