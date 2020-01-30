import React from "react";
import {Link} from "react-router-dom";

const Lose = () => {

    return (
        <div>
        <h1> This is the Losing page.</h1>
        <Link to="/"><button> Try again?</button></Link>
        </div>
    )
}

export default Lose;
