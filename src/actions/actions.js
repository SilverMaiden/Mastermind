import axios from 'axios';

export const SET_UP_GAME_START = 'SET_UP_GAME_START';
export const SET_UP_GAME_SUCCESS = 'SET_UP_GAME_SUCCESS';
export const SET_UP_GAME_ERROR = 'SET_UP_GAME_ERROR';

export const SET_MODE_START = 'SET_MODE_START';
export const SET_MODE_SUCCESS = 'SET_MODE_SUCCESS';
export const SET_MODE_ERROR = 'SET_MODE_ERROR';

export const SPINNER_OFF = 'SPINNER_OFF';

export const HANDLE_CLICK = 'HANDLE_CLICK';

export const RESET_GAME = 'RESET_GAME';

export const HANDLE_TIMER_START = 'HANDLE_TIMER_START';
export const HANDLE_TIMER_SUCCESS = 'HANDLE_TIMER_SUCCESS';
export const HANDLE_TIMER_ERROR = 'HANDLE_TIMER_ERROR';

export const CHECK_ANSWER_START = 'CHECK_ANSWER_START';
export const CHECK_ANSWER_SUCCESS_CORRECT = 'CHECK_ANSWER_SUCCESS_CORRECT';
export const CHECK_ANSWER_SUCCESS_INCORRECT = 'CHECK_ANSWER_SUCCESS_INCORRECT';
export const CHECK_ANSWER_ERROR = 'CHECK_ANSWER_ERROR';


export const resetGame = () => dispatch => {
    dispatch({type: RESET_GAME});
}

export const setMode = (mode) => dispatch => {
    dispatch({type: SET_MODE_START});
    if (mode === 'easy' || mode === 'hard') {
        let changedState = {mode: mode};
        dispatch({type: SET_MODE_SUCCESS, payload: changedState})
    } else {
        let error = `ERROR: The current value of mode is ${mode}, which is not valid.`;
        dispatch({type: SET_MODE_ERROR, payload: error })
    }
}

export const setUpGame = (lengthOfAnswer, minRuneValue, maxRuneValue) => dispatch => {
    dispatch({type: SET_UP_GAME_START});
    axios.get(`https://www.random.org/integers/?num=${lengthOfAnswer}&min=${minRuneValue}&max=${maxRuneValue}&col=1&base=10&format=plain&rnd=new`)
    .then(response => {
        // Converting the response from a newline-separated string to an array of integers.
        let correctAnswer = response.data.split("\n").filter(element => (
            element !== "" // remove empty element due to trailing newline character in response
        )).map(element => {
            return parseInt(element);
        })
        let changedState = {correctAnswer: correctAnswer,
                     timerStartTime: Date.now(),
                     timerRunOut: false
        }
        dispatch({type: SET_UP_GAME_SUCCESS, payload: changedState});
    }).then(() => {
        dispatch({type: SPINNER_OFF, payload:false})
    })
    .catch(error => {
        dispatch({type: SET_UP_GAME_ERROR, payload: error});
    })
}

// Called when user hits submit button to enter a guess.
export const checkAnswer = (history, currentGuess, correctAnswer, lengthOfAnswer, createHint, mapNumsToLetters) => dispatch => {

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
        dispatch({type: CHECK_ANSWER_SUCCESS_CORRECT, payload: {hasWon: true}});

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
        let updatedState = {history: updatedHistory};
        dispatch({type: CHECK_ANSWER_SUCCESS_INCORRECT, payload: updatedHistory })
        // Leaving console.log of the correct answer to make it easier to showcase winning functionality
        console.log(`correctAnswer: ${correctAnswer[0]}, ${correctAnswer[1]}, ${correctAnswer[2]}, ${correctAnswer[3]}`);
    }
}



// Called by the Countdown component when the hard mode timer runs out. Sets timerRunOut to true.
export const endTimer = () => dispatch => {
    dispatch({type: HANDLE_TIMER_START});
        dispatch({type: HANDLE_TIMER_SUCCESS, payload: {timerStartTime: null,
                                                            timerRunOut: true}})
}
