import React, {useContext} from 'react';
import {GameContext} from '../../contexts/GameContext';



export const mapNumsToLetters = ["a", "b", "c", "d", "e", "f","g", "h"];
export const lengthOfAnswer = 4;
export const minRuneValue = 0;
export const maxRuneValue = 7;
export const totalAttempts = 10;


export var converter = require('number-to-words');



// Called by the Countdown component when the hard mode timer runs out. Sets timerRunOut to true.
export const handleTimer = (gameState) => {
    let newState = {...gameState, timerRunOut: true};
    return newState;
}

// Called when the user clicks one of the up arrows to change a rune on screen.
// Takes the position of that rune in the guess as input.
export const handleClickUp = (index, gameState, setGameState) => {
    let newArr = gameState.currentGuess;
    // Sets the corresponding currentGuess value back down to the minRuneValue when the currentValue is the maxRuneValue,
    // allowing the user to cycle through the minRuneValue-maxRuneValue range.
    newArr[index] = (newArr[index] === maxRuneValue ? minRuneValue : newArr[index] + 1);
    let newState = {...gameState, currentGuess: newArr};
}

// Called when the user clicks one of the down arrows to change a rune on screen.
// Takes the position of that rune in the guess as input.
export const handleClickDown = (index, gameState, setGameState) => {
    let newArr = gameState.currentGuess
    // Sets the corresponding currentGuess value back up to the maxRunValue when the currentValue is the minRuneValue,
    // allowing the user to cycle through the minRuneValue-maxRuneValue range.
    newArr[index] = (newArr[index] === minRuneValue ? maxRuneValue : newArr[index] - 1); // comment explaining ternary operator;
    setGameState({...gameState, currentGuess: newArr});
}

// Creates a hint based on the user's guess.
export const createHint = (hasCorrectValue, numValsInCorrectPos) => {
    if (numValsInCorrectPos > 0) {
        return `One or more of your runes are in the chosen four, and ${converter.toWords(numValsInCorrectPos)}` + (numValsInCorrectPos > 1 ? ` are` : ` is`) + ` in the right position.`
    } else if (hasCorrectValue) {
        return `One or more of your runes are in the chosen four, but none are in the right position.`
    } else {
        return `None of your runes are in the chosen four, and none are in the right position.`
    }
}

// Called when user hits submit button to enter a guess.
export const handleSubmit = (gameState, setGameState, history, currentGuess, correctAnswer) => {

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

