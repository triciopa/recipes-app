import React from 'react';
import { Link } from 'react-router-dom';
import './Intro.css';

export default function Intro(props) {
  return (
    <div id="componentIntro">
      <h1 id="title">Food app</h1>
      <button>
        <Link to="/main">Get recipes!</Link>
      </button>
    </div>
  );
}
