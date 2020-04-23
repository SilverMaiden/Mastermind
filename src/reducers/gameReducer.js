
const intialState = {
    correctAnswer: [],
    timerRunOut: false,
    currentGuess: new Array(lengthOfAnswer).fill(0),
    hasWon: false,
    remainingAttempts: totalAttempts,
    timerStartTime: null,
    history: [],
    isLoading: true,
    easyMode: false,
    hardMode: false,
    isGameStarted: false,
}

export const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}
