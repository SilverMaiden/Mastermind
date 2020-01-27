import React from 'react';
import logo from './logo.svg';
import './App.css';
import LandingPage from "./components/LandingPage";
import Game from "./components/Game/Game";
import Highscores from "./components/Highscores";

import {Route, Link, BrowserRouter as Router} from 'react-router-dom';

function App() {
  return (
    <Router>
        <div className="App">
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/game" component={Game} />
        <Route exact path="/highscores" component={Highscores} />
        </div>
    </Router>
  );
}

export default App;
