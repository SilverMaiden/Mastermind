import React, {useState, useEffect, useContext} from "react";
import axios from 'axios';
import {GameContext} from "../../contexts/GameContext";
import NumberSlider from "./NumberSlider";
import Countdown from 'react-countdown';

//My components
import Instructions from "../Instructions.js";
import Timer from "../Timer.js";
import AttemptHistory from "./AttemptHistory";
import Lose from "../Lose";
import Win from "../Win";

//Fontawsome import for icons
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


// import fontawesome library
import '../../fontawesome.js';
const Game = (props) => {


    const mapNumsToLetters = ["a", "b", "c", "d", "e", "f","g", "h"];
    //Comment: Explain what numOfValues is
    const lengthOfAnswer = 4;
    const minValue = 0;
    const maxValue = 7;
    const totalAttempts = 10;


    const {data} = useContext(GameContext);
    const [gameState, setGameState] = useState({
        //Explain random nums api
        correctAnswer: [],
        timerRunOut: false,
        currentGuess: new Array(lengthOfAnswer).fill(0),
        // Set to true when user correctly guesses the combination, otherwise false.
        pass: false,
        //change attempts in state to remaining attempts
        attempts: totalAttempts,
        //Default value for timer start, change variable name to timerStart
        start: null,
        //Describe what history array is, what it's for, what it's structure is (array of strings)
        history: [],
        //
        loading: true,
    });

    //Destructured Values
    const {
        currentGuess,
        correctAnswer,
        pass,
        attempts,
        history,
        loading
    } = gameState;

    //
    ////Explain what doing here
    // Explain what use effect is doing and why you're using it
    useEffect(() => {
        axios.get(`https://www.random.org/integers/?num=${lengthOfAnswer}&min=${minValue}&max=${maxValue}&col=1&base=10&format=plain&rnd=new`)
            .then(response => {
                //Describe what doing here
                let correctAnswer = response.data.split("\n").filter(element => (
                    element !== ""
                )).map(element => {
                    return parseInt(element);
                })
                setGameState({...gameState,
                             correctAnswer: correctAnswer,
                             loading: false,
                             start: Date.now()
                })
            }).catch(error => {
                console.log(error.message);
            })

    }, [])


    //Comment about timer What is timer: When does it get called Why
    const handleTimer = () => {
        setGameState({...gameState, timerRunOut: true});
    }
    //Handle when user clicks an up arrow for one of the master guess currentGuess
    const handleClickUp = (index) => {
        let newArr = gameState.currentGuess // the array of currentGuess, which we want to modify at a particular index.
        //comment why using ternary operator
        newArr[index] = (newArr[index] === 7 ? 0 : newArr[index] + 1);
        setGameState({...gameState, currentGuess: newArr});
    }

    //Comments
    const handleClickDown = (index) => {
        let newArr = gameState.currentGuess // the array of currentGuess, which we want to modify at a particular index.
        newArr[index] = (newArr[index] === 0 ? 7 : newArr[index] - 1); // comment explaining ternary operator;
        setGameState({...gameState, currentGuess: newArr});
    }
    //Comment what this is doing
    const createHint = (hasCorrectValue, numValsInCorrectPos) => {
        if (numValsInCorrectPos > 0) {
            return `One or more of your runes are in the chosen four, and ${numValsInCorrectPos}` + (numValsInCorrectPos > 1 ? ` are` : ` is`) + ` in the right position.`
        } else if (hasCorrectValue) {
            return `One or more of your runes are in the chosen four, but none are in the right position.`
        } else {
            return `None of your runes are in the chosen four, and none are in the right position.`
        }
    }
    //Comments explaining when gets triggered, what it does
    const handleSubmit = () => {
        let numValsInCorrectPos = 0; // Comment
        let hasCorrectValue = false; //Comment

        //Comment what this is doing
        for (var i = 0; i < lengthOfAnswer; i++) {
            let element = currentGuess[i];
            if (element === correctAnswer[i]) {
                numValsInCorrectPos += 1;
                console.log(numValsInCorrectPos);
            }
            if (correctAnswer.includes(element)) {
                hasCorrectValue = true;
                //comment explaining what this is doing
                //console.log("been hit")
            }
        }

        //Leaving console.log of the correct answer to make it easier to showcase winning functionality
        console.log(`numbers in correct position: ${numValsInCorrectPos}`);
        console.log(`numbers in submission that are in the correct answer: ${hasCorrectValue}`);
        console.log(`correctAnswer: ${correctAnswer[0]}, ${correctAnswer[1]}, ${correctAnswer[2]}, ${correctAnswer[3]}`);
        console.log(`attempts remaining: ${attempts}`);

        let hintEntry = createHint(hasCorrectValue, numValsInCorrectPos);
        let guessEntry = "";
        for (var i = 0; i < lengthOfAnswer; i++) {
            guessEntry += mapNumsToLetters[currentGuess[i]];
        }

        let updatedHistory = history; // unshifting history would try to modify the original string
        updatedHistory.unshift([guessEntry, hintEntry]);

        //Set game state
        setGameState({...gameState,
                     attempts: (gameState.attempts - 1),
                     history: updatedHistory});

        //Time to check for success!
        if (numValsInCorrectPos === lengthOfAnswer) {
            setGameState({...gameState, pass: true});
        }
    }

    //Comment
    const componentOnRight = () => {
        if (data.hardMode) {
            return <Timer startTime={gameState.start} handleTimer={handleTimer} />
        } else {
            return <Instructions/>
        }
    }

    //Description of what it's doing, one or two lines
    const setUpGamePage = () => {
        if (attempts === 0 || gameState.timerRunOut) {
            return <Lose />;
        } else if (pass) {
            return <Win />;
        } else {
            return (
                <div className="container-2">
                    <AttemptHistory history={history} />
                     <div className="container-3">
                        <div className="container-4">
                             {attempts === 10 ?
                                <h3> Enter the correct combination</h3> :
                                <h3>Pattern Not Matched.</h3>}
                                <p className="emphasize"> Attempts remaining: {attempts}</p>
                                <div className="inputContainer">
                                {
                                    currentGuess.map((element, index) => (
                                        <NumberSlider
                                            mapNumsToLetters={mapNumsToLetters}
                                            currentGuess={currentGuess}
                                            index={index}
                                            handleClickUp={handleClickUp}
                                            handleClickDown={handleClickDown}
                                        />
                                    ))
                                }
                                </div>
                        <button className="mainButtons" onClick={handleSubmit}>submit</button>
                        </div>
                    </div>
                    {componentOnRight()}
                </div>
            );
        }
    }

    return (
        <div className="game-page" >
            {loading ? <img className="loading" src={"eclipse155px.svg"} alt="loading spinner" /> :
                <div className="container-1">
                    {setUpGamePage()}
                </div>
            }
        </div>
    )
}

export default Game;
