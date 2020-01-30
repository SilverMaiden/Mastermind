import React from "react";
import { prizes } from "../prizes";

const Win = () => {
    let prizeNames = ["pusheen", "bananapeel", "dragon", "gauntlet"];
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    let randomNum = getRandomInt(0, prizeNames.length);
    let prizeStringify = JSON.stringify([prizes[prizeNames[randomNum]].img]) ;
    let prizeLocation =  prizeStringify.substr(2, prizeStringify.length - 4);

    return (
        <div>
            <h1> This is the Winning page.</h1>
            <img src={prizeLocation} alt="img" />
            {console.log(prizeLocation)}
        </div>
    )
}

export default Win;
