import React, {useState, useEffect, useContext} from "react";
import axios from 'axios';
import {GameContext} from "../../contexts/GameContext";
import NumberSlider from "./NumberSlider";

//My components
import Instructions from "../Instructions.js";
import Timer from "../Timer.js";
import AttemptHistory from "./AttemptHistory";
import Lose from "../Lose";
import Win from "../Win";

// import fontawesome library
import '../../fontawesome.js';
const Game = (props) => {

    /*
     * The Game component handles all of the logic of Mastermind.
     *
     * Variables:
     *
     * mapNumsToLetters - An array of letters a-h, which correspond to the numbers 0-7.
     * Used to convert the random numbers (from the random number api) to the 'runes'
     * that are displayed to the user.
     *
     * lengthOfAnswer - The number of 'runes' in the combination that the user must guess.
     * Set to 4 by default.
     *
     * minRuneValue, maxRuneValue - The minimum and maximum possible numeric values of a 'rune'.
     * Their difference (plus one) gives the number of options the user has to choose from
     * for each position in the answer.
     *
     * totalAttempts - The number of chances the user has to guess the correct answer.
     */

    const mapNumsToLetters = ["a", "b", "c", "d", "e", "f","g", "h"];
    const lengthOfAnswer = 4;
    const minRuneValue = 0;
    const maxRuneValue = 7;
    const totalAttempts = 10;

    //Used to convert integers to their English representations.
    var converter = require('number-to-words');


    /*
     * Using Context API to get the global state "data", which contains three pieces of state:
     *
     * easyMode, hardMode - Both set to false by default. One of these values is set to true at
     * the beginning of the game when a user selects a mode.
     *
     * isGameStarted - Set to false by default. Changes to true when a user selects a mode for
     * the game. Used to redirect the user back to the main page when they refresh while in a
     * game (as refreshing resets this value to false).
     *
     * This state is provided to all components through the App.js component.
     */
    const {data} = useContext(GameContext);

    /*
     * The setup of the Game component's local state.
     *
     * correctAnswer - An array containing "lengthOfAnswer" random numbers. Initialized on component mount.
     *
     * timerRunOut - Only used in 'hard mode'. Set to false by default. Changes to true when the timer for
     * the user to guess the correct answer reaches 0.
     *
     * hasWon - Set to false by default. Changes to true when the user guesses the correct combination of 'runes'.
     * (This must happen before the user runs out of attempts and/or before the timer reaches 0)
     * Controls when the "Win" component is mounted.
     *
     * remainingAttempts - initialized to totalAttempts when the game first starts. Decreases by 1 every time the user
     * submits a guess of the combination.
     *
     * timerStartTime - Set to null by default and updated to Date.now() when the game beings.
     * Used to store the time at which the timer begins counting down.
     *
     * history - An array of arrays. Starts empty. Every time the user submits a guess, an array containing
     * the guess (at position 0) and a hint corresponding to that guess (at position 1) is added. Displayed
     * on the left side of the screen while the game is being played.
     *
     * isLoading - Set to true whenever the component is waiting on an API call to return and changed to false
     * once a value is received. Used to show user a loading screen while waiting for game state to be initialized.
     */
    const [gameState, setGameState] = useState({
        correctAnswer: [],
        timerRunOut: false,
        currentGuess: new Array(lengthOfAnswer).fill(0),
        hasWon: false,
        remainingAttempts: totalAttempts,
        timerStartTime: null,
        history: [],
        isLoading: true,
    });

    // Destructuring state to allow us to reference its values directly.
    // Example: We can now reference the state "isLoading" as isLoading, instead of gameState.isLoading
    const {
        currentGuess,
        correctAnswer,
        hasWon,
        remainingAttempts,
        history,
        isLoading
    } = gameState;

    /*
     * useEffect() - Built in React hook for functional components to use life-cycle methods.
     * On component mount, it makes a request to the random number api to generate a randomized
     * 'correct' answer.
     */
    useEffect(() => {
        axios.get(`https://www.random.org/integers/?num=${lengthOfAnswer}&min=${minRuneValue}&max=${maxRuneValue}&col=1&base=10&format=plain&rnd=new`)
            .then(response => {
                // Converting the response from a newline-separated string to an array of integers.
                let correctAnswer = response.data.split("\n").filter(element => (
                    element !== "" // remove empty element due to trailing newline character in response
                )).map(element => {
                    return parseInt(element);
                })
                setGameState({...gameState,
                             correctAnswer: correctAnswer,
                             isLoading: false,
                             timerStartTime: Date.now()
                })
            }).catch(error => {
                console.log(error.message);
            })

    }, []);


    // Called by the Countdown component when the hard mode timer runs out. Sets timerRunOut to true.
    const handleTimer = () => {
        setGameState({...gameState, timerRunOut: true});
    }

    // Called when the user clicks one of the up arrows to change a rune on screen.
    // Takes the position of that rune in the guess as input.
    const handleClickUp = (index) => {
        let newArr = gameState.currentGuess;
        // Sets the corresponding currentGuess value back down to the minRuneValue when the currentValue is the maxRuneValue,
        // allowing the user to cycle through the minRuneValue-maxRuneValue range.
        newArr[index] = (newArr[index] === maxRuneValue ? minRuneValue : newArr[index] + 1);
        setGameState({...gameState, currentGuess: newArr});
    }

    // Called when the user clicks one of the down arrows to change a rune on screen.
    // Takes the position of that rune in the guess as input.
    const handleClickDown = (index) => {
        let newArr = gameState.currentGuess
        // Sets the corresponding currentGuess value back up to the maxRunValue when the currentValue is the minRuneValue,
        // allowing the user to cycle through the minRuneValue-maxRuneValue range.
        newArr[index] = (newArr[index] === minRuneValue ? maxRuneValue : newArr[index] - 1); // comment explaining ternary operator;
        setGameState({...gameState, currentGuess: newArr});
    }

    // Creates a hint based on the user's guess.
    const createHint = (hasCorrectValue, numValsInCorrectPos) => {
        if (numValsInCorrectPos > 0) {
            return `One or more of your runes are in the chosen four, and ${converter.toWords(numValsInCorrectPos)}` + (numValsInCorrectPos > 1 ? ` are` : ` is`) + ` in the right position.`
        } else if (hasCorrectValue) {
            return `One or more of your runes are in the chosen four, but none are in the right position.`
        } else {
            return `None of your runes are in the chosen four, and none are in the right position.`
        }
    }

    // Called when user hits submit button to enter a guess.
    const handleSubmit = () => {

        // The number of values in the correct position. Initialized to 0.
        let numValsInCorrectPos = 0;
        // Whether the currentGuess contains one or more of the runes in the answer. Initialized to false. .
        let hasCorrectValue = false;

        // Calculates how many runes in the user's guess are in the right position and if any appear in the correct answer.
        for (let i = 0; i < lengthOfAnswer; i++) {
            let element = currentGuess[i];
            if (element === correctAnswer[i]) {
                numValsInCorrectPos += 1;
            }

            if (correctAnswer.includes(element)) {
                hasCorrectValue = true;
            }
        }

        // Time to check for success!
        if (numValsInCorrectPos === lengthOfAnswer) {
            setGameState({...gameState, hasWon: true});

        } else {
            // Guess was incorrect: have to update history and give hint

            let hintEntry = createHint(hasCorrectValue, numValsInCorrectPos);
            let guessEntry = "";

            // Converting the user's guess from integers to their 'rune' counterparts.
            for (let i = 0; i < lengthOfAnswer; i++) {
                guessEntry += mapNumsToLetters[currentGuess[i]];
            }

            let updatedHistory = history;
            updatedHistory.unshift([guessEntry, hintEntry]);

            // Update game state based on user's guess
            setGameState({...gameState,
                         remainingAttempts: (gameState.remainingAttempts - 1),
                         history: updatedHistory
            });
            // Leaving console.log of the correct answer to make it easier to showcase winning functionality
            console.log(`correctAnswer: ${correctAnswer[0]}, ${correctAnswer[1]}, ${correctAnswer[2]}, ${correctAnswer[3]}`);
        }
    }

    // Sets the component on the right side of the screen to a timer or instructions depending on which mode the user selects.
    const componentOnRight = () => {
        if (data.hardMode) {
            return <Timer startTime={gameState.timerStartTime} handleTimer={handleTimer} />
        } else {
            return <Instructions/>
        }
    }

    // Displays attempt history on left, game in the middle, and instructions/a timer on the right
    const setUpGamePage = () => {
        if (remainingAttempts === 0 || gameState.timerRunOut) {
            return <Lose />;
        } else if (hasWon) {
            return <Win />;
        } else {
            return (
                <div className="container-2">
                    <AttemptHistory history={history} />
                     <div className="container-3">
                        <div className="container-4">
                             {remainingAttempts === totalAttempts ?
                                <h3> Enter the correct combination</h3> :
                                <h3>Pattern Not Matched.</h3>}
                                <p className="emphasize"> Attempts remaining: {remainingAttempts}</p>
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
        };
    };

    return (
        <div className="game-page" >
            {isLoading ? <img className="loading" src={"eclipse155px.svg"} alt="loading spinner" /> :
                <div className="container-1">
                    {setUpGamePage()}
                </div>
            }
        </div>
    )
}

export default Game;
