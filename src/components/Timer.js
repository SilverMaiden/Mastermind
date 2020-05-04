import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import Countdown from 'react-countdown';
import { endTimer } from '../actions/actions';

// This component renders the timer in hard mode.
const Timer = (props) => {

    const dispatch = useDispatch();

    const onComplete = () => dispatch(endTimer());

    const startTime = useSelector(state => state.gameReducer.timerStartTime);

    return (
        <div className="extra">
            <div className="instructions-component timer-component">
                <p> Time remaining:</p>
                <div className="content">
                <img src={'hourglass55px.svg'} alt = "hourglass" />
                <Countdown
                date={startTime + 60000}
                intervalDelay={0}
                precision={0}
                renderer={props => <div>{props.seconds}</div>}
                onComplete={onComplete}
                />
                </div>
            </div>
        </div>

    )
}


export default Timer;
