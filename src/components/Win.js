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
        <div className="win-component">
            <h1> You have won the challenge.</h1>
            <p> The Gods and Goddesses above have witnessed your skill, and reward you with: </p>
            <h5> {prizes[prizeNames[randomNum]].title}</h5>
            <div className="circle">
                <img src={prizeLocation} alt="img" />
            </div>
            <h6>{prizes[prizeNames[randomNum]].tagline}</h6>
            {console.log(prizeLocation)}
        </div>
    )
}

export default Win;
