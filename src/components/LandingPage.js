import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {setMode, resetGame} from '../actions/actions';
import SnowStorm from "react-snowstorm";

// The main page of the game, where the user selects the difficulty of the game before starting.
// All refreshes redirect to here.
const LandingPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetGame())
    },[])

    const handleClick = (mode) => {
        dispatch(setMode(mode));
    }

    return (
        <div className="landingPage">
        <SnowStorm />
            <div className="container">
               <h1 className="header"> Mastermind </h1>
               <h4> Choose your difficulty</h4>
               <div className="modeButtons">
                   <Link to="/game"><button className="mainButtons" onClick={() => handleClick("easy")}> Easy </button></Link>
                   <Link to="/game"><button className="mainButtons" onClick={() => handleClick("hard")}> Hard </button></Link>
            </div>
           </div>
        </div>
    )
}

export default LandingPage;
