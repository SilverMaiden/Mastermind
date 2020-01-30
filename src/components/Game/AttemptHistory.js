import React, {useContext} from "react";

const AttemptHistory = (props) => {
    return (
        <div className="history-component">
            <h5> Attempts History </h5>
            {props.history.length > 0 ?
                props.history.map(element => (
                    <div className="historyContainer">
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
    )
}

export default AttemptHistory;
