import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import './css/index.css';
import LandingPage from "./components/LandingPage";
import Game from "./components/Game/Game";
import {Route, Redirect, BrowserRouter as Router} from 'react-router-dom';

//Context
import {GameContext} from "./contexts/GameContext";

// This component sets up the routing for the application, along with the global state.
function App() {
    // Setting up global state
    //
    const dispatch = useDispatch();
    const isGameStarted = useSelector(state => state.gameReducer.isGameStarted);
  return (
        <Router>
            <div className="App">
            {
                // Displays the LandingPage component at '/'
            }
            <Route exact path="/" component={LandingPage} />

            {
                // Displays the Game component at '/game' when the user selects a mode,
                // but on refresh redirects to '/'.
            }
            <Route exact path ='/game'>
                {isGameStarted ? <Game /> : <Redirect to="/" />}
            </Route>
            </div>
        </Router>
  );
}

export default App;
