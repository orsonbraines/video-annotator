import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div id='header'>
      <Link to = "/">
        <h1 id='appName'>JOHTnotes</h1>
      </Link>
    </div>
  );
}