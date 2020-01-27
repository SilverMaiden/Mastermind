import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import LandingPage from "./components/LandingPage";
import Game from "./components/Game/Game";
import Highscores from "./components/Highscores";
import {Route, Link, BrowserRouter as Router} from 'react-router-dom';
import {GameContext} from "./contexts/GameContext";
import axios from 'axios';


function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("https://www.random.org/integers/?num=4&min=1&max=6&col=1&base=10&format=plain&rnd=new")
        .then(response => {
            setData(response.data)
        })
    }, [])

  return (
    <GameContext.Provider value={data}>
        <Router>
            <div className="App">
            {console.log(data)}
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/game" component={Game} />
            <Route exact path="/highscores" component={Highscores} />
            </div>
        </Router>
    </GameContext.Provider>
  );
}

export default App;
