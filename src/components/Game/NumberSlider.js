import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// This component renders each of the slots from which a user can guess a number/rune.
const NumberSlider = (props) => {

    return (
        <div className="inputDiv">
                <button className="btn" onClick={() => props.handleClickUp(props.index)}>
                <FontAwesomeIcon
                    icon="chevron-up"
                    size="2x"
                /></button>

             <p className="norse input">
                {props.mapNumsToLetters[props.currentGuess[props.index]]}
            </p>
                <button className="btn down" onClick={() => props.handleClickDown(props.index)}>
                <FontAwesomeIcon
                    icon="chevron-down"
                    size="2x"
                /></button>
            </div>




    )
}

export default NumberSlider;
