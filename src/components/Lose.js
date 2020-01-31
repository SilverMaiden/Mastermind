import React from "react";
import {Link} from "react-router-dom";

const Lose = () => {

    return (
        <div className="lose-component">
        <h1 className="header"> You have failed</h1>
        <p> The Gods and Goddesses are not impressed.</p>

        <Link to="/"><button className="button"> ...try again?</button></Link>
        </div>
    )
}

export default Lose;
