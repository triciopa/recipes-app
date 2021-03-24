import React from 'react';
import { Link } from 'react-router-dom';

export default function Intro(props) {
  return (
    <div>
      <h1 id="title">Food app</h1>
      <Link to="/main">
        <p>Entrar</p>
      </Link>
    </div>
  );
}
