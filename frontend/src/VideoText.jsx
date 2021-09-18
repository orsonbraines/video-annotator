import React from 'react';
import './VideoText.css';

export default function VideoText() {
  return (
    <div id='textContainer'>
      <div id='searchContainer'>
        <input type='text' placeholder='Search' id='searchBar'></input>
      </div>
      <div id='subtitles'></div>
    </div>
  );
}