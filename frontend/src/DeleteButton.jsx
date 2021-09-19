import React from 'react';
import './DeleteButton.css';

export default function DeleteButton(props) {
  return (
    <button className={'deleteButton'} onClick={props.doDelete}>Delete</button>
  );
}
