import React, {useState, useContext} from "react";
import {GameContext} from "../../contexts/GameContext";
import NumberSlider from "./NumberSlider";
import Timer from "./Timer";
import Attempts from "./Attempts";

const Game = (props) => {
    const {data, addChosen} = useContext(GameContext);

    /*
    let randomNumsArr = data.randomNums.split("").filter(element => (
        element in ["0", "1", "2", "3", "4", "5", "6", "7"]
    ))
    */
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
    let location = 0;

  const [position, setPosition] = useState({
      first: 0,
      second: 0,
      third: 0,
      fourth: 0
  })

    return (
        <div className="container">
            <h1> This is the game page.</h1>

            <div className="inputContainer">
                <NumberSlider data={data} addChosen={addChosen} norseChars={norseChars} location={"first"} />
                <NumberSlider data={data} addChosen={addChosen} location={"second"} />
                <NumberSlider data={data} addChosen={addChosen} location={"third"} />
                <NumberSlider data={data} addChosen={addChosen} location={"fourth"} />

            </div>
        </div>
    )
}

export default Game;
