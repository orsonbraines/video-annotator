import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import './App.css';
import VideoBox from './VideoBox.jsx';
import VideoText from './VideoText.jsx';
import Header from './Header.jsx';
import Notes from './Notes.jsx';
import VideoLibrary from './VideoLibrary.jsx';
//import AddVideo from './AddVideo.jsx';
//import Page from '.mainPage/MainPage.jsx'

export default function App() {
  return (
    <Router>
      <Link to='/mainPage'></Link>
      <Link to='/videoPlayerPage'></Link>

      <Switch>
        <Route path='/'>
          <MainPage />
        </Route>
        <Route path='/videoPlayerPage'>
          <VideoPlayerPage />
        </Route>
      </Switch>
    </Router>
  );
}

function MainPage() {
  return (
    <div>
      <Header />
      <VideoLibrary />
    </div>
  );
}

function VideoPlayerPage() {
  return (
    <div>
      <Header />
      <div className='upper'>
        <VideoBox />
        <VideoText />
      </div>
      <div className='lower'>
        <Notes />
      </div>
    </div>
  );
}