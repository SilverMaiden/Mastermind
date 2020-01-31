import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {GameContext} from "../contexts/GameContext";
import Game from "./Game/Game";

const LandingPage = () => {
    const {selectMode} = useContext(GameContext);

    const handleClick = (mode) => {
        selectMode(mode);
    }

    return (
        <div className="landingPage">
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
