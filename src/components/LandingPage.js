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
        <div>
            <h1> This is the landing page.</h1>
            <h4> Select difficulty:</h4>
           <Link to="/game"><button onClick={() => handleClick("easyMode")}> Easy Mode </button></Link>
           <Link to="/game"><button onClick={() => handleClick("hardMode")}> Hard Mode </button></Link>
        </div>
    )
}

export default LandingPage;
