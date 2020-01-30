import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NumberSlider = (props) => {



    return (
        <div className="inputDiv">
                <button className="btn" onClick={() => props.handleClickUp(props.index)}>
                <FontAwesomeIcon
                    icon="chevron-circle-up"
                    size="lg"
                /></button>

             <p className="norse input">
                {props.letters[props.values[props.index]]}
            </p>
                <button className="btn down" onClick={() => props.handleClickDown(props.index)}>
                <FontAwesomeIcon
                    icon="chevron-circle-down"
                    size="lg"
                /></button>
            </div>




    )
}

export default NumberSlider;
