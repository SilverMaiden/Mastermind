import React, {useEffect, useState, useReducer} from 'react';
import logo from './logo.svg';
import './App.css';
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
        setData({...data, [mode]: true});
    }


  return (
    <GameContext.Provider value={{data}}>
        <Router>
            <div className="App">
            {console.log(data)}
            <Route exact path="/" component={LandingPage} />

            <Route exact path ='/game'
                render={(props) => <Game {...props}  />} />

            <Route exact path="/highscores" component={Highscores} />
            </div>
        </Router>
    </GameContext.Provider>
  );
}

export default App;
