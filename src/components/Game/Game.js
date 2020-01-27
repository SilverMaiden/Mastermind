import React, {useState, useContext} from "react";
import {GameContext} from "../../contexts/GameContext";
import NumberSlider from "./NumberSlider";
import Timer from "./Timer";
import Attempts from "./Attempts";

const Game = () => {
    const randomNums = useContext(GameContext);
    const norseChars = {
        0: 'a',
        1: 'b',
        2: "c",
        3: "d",
        4: "e",
        5: "f",
        6: "g",
        7: "h"
    }
    console.log(typeof randomNums)

    return (
        <div>
            <h1 className="norse" > This is the game page.</h1>
            <NumberSlider />
            <Timer />
            <Attempts />
        </div>
    )
}

export default Game;
