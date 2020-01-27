import React from "react";

import NumberSlider from "./NumberSlider";
import Timer from "./Timer";
import Attempts from "./Attempts";

const Game = () => {

    return (
        <div>
            <h1> This is the game page.</h1>
            <NumberSlider />
            <Timer />
            <Attempts />
        </div>
    )
}

export default Game;
