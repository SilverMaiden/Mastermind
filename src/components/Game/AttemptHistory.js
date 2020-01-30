import React, {useContext} from "react";

const AttemptHistory = (props) => {
    return (
        <div className="history-component">
        <h5 className="header"> Attempts History </h5>
        {props.history.length > 0 ?
            props.history.map(element => (
                <div className="historyContainer">
                    <h6> Hint:</h6>
                    <p> {element[1]}
                    <br />
                     Your guess: </p>
                    <p className="norse">
                        {element[0]}
                    </p>
                </div>
                )
            ) : <p />}

        </div>
    )
}

export default AttemptHistory;
