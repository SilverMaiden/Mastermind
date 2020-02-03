import React from "react";

// This component renders the users attempt history.
const AttemptHistory = (props) => {
    let myKey = props.historyKey;
    return (
        <div>
        <div className="history-component">
            <p className="header"> Attempts History </p>
            {props.history.length > 0 ?
                props.history.map(element => (
                    <div key={myKey += 1} className="historyContainer">
                        <h6> Hint:</h6>
                        <p className="hint"> {element[1]}
                        <br />
                        <br />
                         Your guess: </p>
                        <p className="norse guess">
                            {element[0]}
                        </p>
                    </div>
                    )
                ) : <p />}

        </div>
        </div>
    )
}

export default AttemptHistory;
