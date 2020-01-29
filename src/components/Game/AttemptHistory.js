import React, {useContext} from "react";

const AttemptHistory = (props) => {
    return (
        <div>
        {props.history.length > 0 ?
            props.history.map(element => (
                <div>
                    <h6> {element[1]} </h6>
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
