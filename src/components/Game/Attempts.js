import React from "react";

const Attempts = (props) => {
    let message;

    return (
        <div>
        {props.data.firstAttempt ? <h3> Enter the correct combination</h3> : <h3>Pattern Not Matched.</h3>}
        <h6> Attempts Remaining: {props.data.attempts} </h6>
        { props.data.rightNums > 0 && props.data.rightPositions === props.data.rightNums ?
            <p> However, you have guessed {props.data.rightNums} of the runes correctly, and {props.data.rightPositions} of the positions.</p>
        : <p> You have guessed {props.data.rightNums} of the runes correctly.  </p>}

        </div>
    )
}

export default Attempts;
