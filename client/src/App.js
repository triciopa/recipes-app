import React from 'react';
import { Route } from 'react-router-dom';

// componentes //
import Intro from './components/Intro/Intro.js';
import SearchBar from './components/SearchBar/SearchBar.js';
import Recipe from './components/Recipe/Recipe.js';
import Form from './components/Form/Form.js';

import './App.css';

function App() {
  return (
    <React.Fragment>
      <Route exact path="/" component={Intro} />
      <Route exact path="/main/" component={SearchBar} />
      <Route exact path="/recipe/:id" component={Recipe} />
      <Route exact path="/create" component={Form} />
    </React.Fragment>
  );
}

export default App;
