import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Header from './Header.jsx';
import './App.css';
import VideoPlayer from './VideoPlayerPage.jsx';
import MainPage from './MainPage';


export default function App() {
  return (
    <Router>

      <Switch>
        <Route exact path='/'>
          <MainPage />
        </Route>
        <Route path='/videoPlayer/:id'>
          <VideoPlayer />
        </Route>
      </Switch>
    </Router>
  );
}

// MainPage and VideoPlayerPage now contains the two seperate pages. This looks a lot cleaner.classNameclassName
      // <AddVideo />
      // <AddVideo />
