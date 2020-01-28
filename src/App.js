import React, {useEffect, useState, useReducer} from 'react';
import logo from './logo.svg';
import './App.css';
import LandingPage from "./components/LandingPage";
import Game from "./components/Game/Game";
import Highscores from "./components/Highscores";
import {Route, Link, BrowserRouter as Router} from 'react-router-dom';
import {GameContext} from "./contexts/GameContext";
import axios from 'axios';

//Reducers

function App() {
    const [data, setData] = useState({
        randomNums: [],
        chosenNums: {
            first: 0,
            second: 0,
            third: 0,
            fourth: 0
        },
    });

    const addChosen = (num, location) => {
        setData({...data, chosenNums: {...data.chosenNums, [location]: num }})
    }

    useEffect(() => {
        axios.get("https://www.random.org/integers/?num=4&min=1&max=6&col=1&base=10&format=plain&rnd=new")
            .then(response => {
                let arrayFormat = response.data.split("").filter(element => (
                    element in ["0", "1", "2", "3", "4", "5", "6", "7"]
                ))
                let intArr = arrayFormat.map(element => (
                    parseInt(element)
                ))

                setData({...data, randomNums: intArr })
            })

    }, [])

  return (
    <GameContext.Provider value={{data, addChosen}}>
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
