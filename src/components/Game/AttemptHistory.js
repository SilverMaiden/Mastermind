import React, {useContext} from "react";

const AttemptHistory = (props) => {
    return (
        <div>
        {props.history.length > 0 ?
            props.history.map(element => (
                <p className="norse">
                    {element}
                </p>
                )
            ) : <p />}

        </div>
    )
}

export default AttemptHistory;
