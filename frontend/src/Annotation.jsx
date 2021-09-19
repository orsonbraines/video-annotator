import React from 'react';
import './Annotation.css';
import { delete_annotation } from './jsonapi';

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
  return (
    <div className='annotation'>
      <span><button onClick={() => props.setSeekTime(props.annotation.ts / 1000.0)}>{`${String(Math.floor(props.annotation.ts / 60000)).padStart(2,'0')}:${String(Math.floor((props.annotation.ts - 60000 * Math.floor(props.annotation.ts / 60000)) / 1000)).padStart(2,'0')}`}</button></span>
      <span className="annotationMsg">{props.annotation.msg}</span>
      <span className="deleteButton"><button onClick={onClick}>Delete</button></span>
    </div>
  );
}
