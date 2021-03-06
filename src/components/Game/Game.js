import React, {useState, useEffect, useContext} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NumberSlider from './NumberSlider';

//My components
import Instructions from '../Instructions.js';
import Timer from '../Timer.js';
import AttemptHistory from './AttemptHistory';
import Lose from '../Lose';
import Win from '../Win';

//Importing actions
import { setUpGame, handleTimer, checkAnswer } from '../../actions/actions';



// Importing variables to handle the game
import {
    mapNumsToLetters,
    lengthOfAnswer,
    minRuneValue,
    maxRuneValue,
    totalAttempts,
    converter,
} from './GameVariables'

// import fontawesome library
import '../../fontawesome.js';
const Game = (props) => {
    const dispatch = useDispatch();

    /*
     * The Game component handles the game views and dispatching actions in this game of mastermind.
     *
     * Variables imported from variables.js:
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


    /*
     *
     * This state is provided to all components through Redux.
     *
     * The structure of the initial store:
     *
     * correctAnswer - An array containing 'lengthOfAnswer' random numbers. Initialized on component mount.
     *
     * timerRunOut - Only used in 'hard mode'. Set to false by default. Changes to true when the timer for
     * the user to guess the correct answer reaches 0.
     *
     * hasWon - Set to false by default. Changes to true when the user guesses the correct combination of 'runes'.
     * (This must happen before the user runs out of attempts and/or before the timer reaches 0)
     * Controls when the 'Win' component is mounted.
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
     *
     * easyMode, hardMode - Both set to false by default. One of these values is set to true at
     * the beginning of the game when a user selects a mode.
     *
     * isGameStarted - Set to false by default. Changes to true when a user selects a mode for
     * the game. Used to redirect the user back to the main page when they refresh while in a
     * game (as refreshing resets this value to false).
     *

     */
    const correctAnswer = useSelector(state => state.gameReducer.correctAnswer);
    const timerRunOut = useSelector(state => state.gameReducer.timerRunOut);
    const hasWon = useSelector(state => state.gameReducer.hasWon);
    const remainingAttempts = useSelector(state => state.gameReducer.remainingAttempts);
    const timerStartTime = useSelector(state => state.gameReducer.timerStartTime);
    const history = useSelector(state => state.gameReducer.history);
    const isLoading = useSelector(state => state.gameReducer.isLoading);
    const hardMode = useSelector(state => state.gameReducer.hardMode);
    const easyMode = useSelector(state => state.gameReducer.easyMode);

    const [currentGuess, setCurrentGuess] = useState(new Array(lengthOfAnswer).fill(0));

    // Destructuring state to allow us to reference its values directly.
    // Example: We can now reference the state 'isLoading' as isLoading, instead of gameState.isLoading


    /*
     * useEffect() - Built in React hook for functional components to use life-cycle methods.
     * On component mount, it makes a request to the random number api to generate a randomized
     * 'correct' answer.
     */
    useEffect(() => {
        dispatch(setUpGame(lengthOfAnswer, minRuneValue, maxRuneValue))
    }, []);

    const onSubmit = () => {
        dispatch(checkAnswer(history, currentGuess, correctAnswer, lengthOfAnswer, createHint, mapNumsToLetters))
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



    // Sets the component on the right side of the screen to a timer or instructions depending on which mode the user selects.
    const componentOnRight = () => {
        if (hardMode) {
            return <Timer />
        } else {
            return <Instructions/>
        }
    }

    // Displays attempt history on left, game in the middle, and instructions/a timer on the right
    const setUpGamePage = () => {
        if (remainingAttempts === 0 || timerRunOut) {
            return <Lose />;
        } else if (hasWon) {
            return <Win />;
        } else {
            return (
                <div className='container-2'>
                    <AttemptHistory
                        history={history}
                        historyKey={totalAttempts - remainingAttempts}
                        />
                     <div className='container-3'>
                        <div className='container-4'>
                             {remainingAttempts === totalAttempts ?
                                <h1> Enter the correct combination</h1> :
                                <h1>Pattern Not Matched.</h1>}
                                <p className='emphasize'> Attempts remaining: {remainingAttempts}</p>
                                <div className='inputContainer'>
                                {
                                    currentGuess.map((element, index) => (
                                        <NumberSlider
                                            key={index}
                                            currentGuess={currentGuess}
                                            setCurrentGuess={setCurrentGuess}
                                            index={index}
                                        />
                                    ))
                                }
                                </div>
                        <button className='mainButtons' onClick={onSubmit}>submit</button>
                        </div>
                    </div>
                    {componentOnRight()}
                </div>
            );
        };
    };

    return (
        <div className='game-page' >
            {isLoading ? <img className='loading' data-testid='spinner' src={'eclipse155px.svg'} alt='loading spinner' /> :
                <div className='container-1'>
                    {setUpGamePage()}
                </div>
            }
        </div>
    )
}

export default Game;
