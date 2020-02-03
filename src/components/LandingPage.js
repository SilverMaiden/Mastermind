import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {GameContext} from "../contexts/GameContext";
import SnowStorm from "react-snowstorm";

// The main page of the game, where the user selects the difficulty of the game before starting.
// All refreshes redirect to here.
const LandingPage = () => {
    const {selectMode} = useContext(GameContext);

    const handleClick = (mode) => {
        selectMode(mode);
    }

    return (
        <div className="landingPage">
        <SnowStorm />
            <div className="container">
               <h1 className="header"> Mastermind </h1>
               <h4> Choose your difficulty</h4>
               <div className="modeButtons">
                   <Link to="/game"><button className=" mainButtons" onClick={() => handleClick("easyMode")}> Easy </button></Link>
                   <Link to="/game"><button className="mainButtons" onClick={() => handleClick("hardMode")}> Hard </button></Link>
            </div>
           </div>
        </div>
    )
}

export default LandingPage;
