import React from "react";
import {Link} from "react-router-dom";

// This component renders the Losing page, from where the user can choose to start a new game.
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
