import React from "react";

import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Instructions = () => {

    return (
        <div className="instructions-component">
        <h5> Time remaining:</h5>
        <img src={'hourglass55px.svg'} alt = "hourglass" />
                    <h3> 60 </h3>
        </div>
    )
}

export default Instructions;
