import React from "react";

// This component renders the instructions on the right side of the page when in easy mode.
const Instructions = () => {

    return (
        <div className="extra">
            <div className="instructions-component">
            <h3> Instructions: </h3>
            <p>
                The Gods will randomly select a pattern of four different runes
                from a total of eight different runes.
                <br />
            </p>
            <p>
                You have 10 attempts to guess the correct rune combination.
                <br />
            </p>
            <p>
                At the end of each guess, the Gods will give you a hint as to how close you are.
                <br />
            </p>
            </div>
        </div>
    )
}

export default Instructions;
