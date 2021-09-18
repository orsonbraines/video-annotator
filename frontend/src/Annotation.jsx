import React from 'react';
import './Annotation.css';

export default function Annotation(props) {
  return (
    <div className='annotation'>
      <span><button onClick={() => props.setSeekTime(props.annotation.ts / 1000.0)}>{props.annotation.ts}</button></span>
      <span className="annotationMsg">{props.annotation.msg}</span>
    </div>
  );
}
