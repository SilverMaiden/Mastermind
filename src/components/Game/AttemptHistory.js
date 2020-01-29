import React, {useContext} from "react";
import {GameContext} from "../../contexts/GameContext";

const AttemptHistory = () => {
    const {data} = useContext(GameContext);
    return (
        <div>
        {data.attemptHistory ?
            data.attemptHistory.map(element => (
                <p className="norse">
                    {element}
                </p>
                )
            ) : <p />}

        </div>
    )
}

export default AttemptHistory;
