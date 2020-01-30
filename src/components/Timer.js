import React from "react";
import Countdown from 'react-countdown';

const Timer = (props) => {
    return (
        <div className="instructions-component">
            <h5> Time remaining:</h5>
            <img src={'hourglass55px.svg'} alt = "hourglass" />
            <Countdown
            date={props.startTime + 60000}
            intervalDelay={0}
            precision={0}
            renderer={props => <div>{props.seconds}</div>}
            onComplete={props.handleTimer}
            />
        </div>

    )
}


export default Timer;
