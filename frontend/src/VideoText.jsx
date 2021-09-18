import React from 'react';
import './VideoText.css';

export default function VideoText() {
  return (
    <div className='textContainer'>
      <div className='searchContainer'>
        <input type='text' placeholder='Search' id='searchBar'></input>
      </div>
      <div className='subtitles'></div>
    </div>
  );
}