import React, {useEffect, useState, useReducer} from 'react';
import logo from './logo.svg';
import './App.css';
import './css/index.css';
import LandingPage from "./components/LandingPage";
import Game from "./components/Game/Game";
import Highscores from "./components/Highscores";
import {Route, Link, BrowserRouter as Router} from 'react-router-dom';
import {GameContext} from "./contexts/GameContext";

//Reducers

function App() {
    const [data, setData] = useState({
        highscores: {},
        easyMode: false,
        hardMode: false,
    });

    const selectMode = (mode) => {
        let toFalse;
        if (mode === "easyMode") {
            toFalse = "hardMode"
        } else {
            toFalse = "easyMode"
        }
        setData({...data, [mode]: true, [toFalse]: false});
    }


  return (
    <GameContext.Provider value={{data, selectMode}}>
        <Router>
            <div className="App">
            {console.log(data)}
            <Route exact path="/" component={LandingPage} />

            <Route exact path ='/game' component={Game} />

            <Route exact path="/highscores" component={Highscores} />
            </div>
        </Router>
    </GameContext.Provider>
  );
}

export default App;
