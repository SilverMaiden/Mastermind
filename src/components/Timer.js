import React from "react";
import Countdown from 'react-countdown';

// This component renders the timer in hard mode.
const Timer = (props) => {
    return (
        <div className="extra">
            <div className="instructions-component timer-component">
                <p> Time remaining:</p>
                <div className="content">
                <img src={'hourglass55px.svg'} alt = "hourglass" />
                <Countdown
                date={props.startTime + 60000}
                intervalDelay={0}
                precision={0}
                renderer={props => <div>{props.seconds}</div>}
                onComplete={props.handleTimer}
                />
                </div>
            </div>
        </div>

    )
}


export default Timer;
