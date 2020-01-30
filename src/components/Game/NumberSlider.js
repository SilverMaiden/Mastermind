import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NumberSlider = (props) => {



    return (
        <div className="inputDiv">
                <button className="btn" onClick={() => props.handleClickUp(props.index)}>
                <FontAwesomeIcon
                    icon="chevron-up"
                    size="2x"
                /></button>

             <p className="norse input">
                {props.letters[props.values[props.index]]}
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
