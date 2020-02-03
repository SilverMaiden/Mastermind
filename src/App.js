import React, {useState} from 'react';
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
    const [data, setData] = useState({
        easyMode: false,
        hardMode: false,
        isGameStarted: false,
    });

    const selectMode = (mode) => {
        let toFalse;
        if (mode === "easyMode") {
            toFalse = "hardMode"
        } else {
            toFalse = "easyMode"
        }
        setData({...data, [mode]: true, [toFalse]: false, isGameStarted: true});
    }


  return (
    <GameContext.Provider value={{data, selectMode}}>
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
                {data.isGameStarted ? <Game /> : <Redirect to="/" />}
            </Route>
            </div>
        </Router>
    </GameContext.Provider>
  );
}

export default App;
