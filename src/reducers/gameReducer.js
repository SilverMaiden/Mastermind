// Importing Actions

import {
    SET_MODE_START,
    SET_MODE_SUCCESS,
    SET_MODE_ERROR,
    SET_UP_GAME_START,
    SET_UP_GAME_SUCCESS,
    SET_UP_GAME_ERROR,
    SPINNER_OFF,
    RESET_GAME,
    HANDLE_CLICK,
    HANDLE_TIMER_START,
    HANDLE_TIMER_SUCCESS,
    HANDLE_TIMER_ERROR
} from '../actions/actions';

// Importing functions to handle the game
import {
    mapNumsToLetters,
    lengthOfAnswer,
    minRuneValue,
    maxRuneValue,
    totalAttempts,
} from '../components/Game/GameHandleFunctions';


const initialState = {
    correctAnswer: [],
    minRuneValue: minRuneValue,
    maxRuneValue: maxRuneValue,
    mapNumsToLetters: mapNumsToLetters,
    timerRunOut: false,
    handleTimerStarted: false,
    handleTimerError: false,
    currentGuess: new Array(lengthOfAnswer).fill(0),
    hasWon: false,
    remainingAttempts: totalAttempts,
    timerStartTime: null,
    history: [],
    isLoading: true,
    easyMode: false,
    hardMode: false,
    isGameStarted: false,
    setModeStarted: false,
    setModeError: false,
    setUpGameStarted: false,
    setUpGameError: false,
}

export const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MODE_START:
            return ({...state, setModeStarted: true})

        case SET_MODE_SUCCESS:
            if (action.payload.mode === 'easy')
                return ({...state,
                        isGameStarted: true,
                        setModeStarted: false,
                        easyMode: true,
                        hardMode: false})
            else {
                return ({...state,
                        isGameStarted: true,
                        setModeStarted: false,
                        easyMode: false,
                        hardMode: true })
            }

        case SET_MODE_ERROR:
            return ({...state,
                    sertModeStarted: false,
                    setModeError: action.payload})

        case SET_UP_GAME_START:
            return ({...state, setUpGameStarted: true});
        case SET_UP_GAME_SUCCESS:
            const {
            correctAnswer,
            isLoading,
            timerStartTime
        } = action.payload
        let newState = ({...state,
                        isLoading: false,
                        setUpGameStarted:false,
                        correctAnswer: correctAnswer,
                        isLoading: isLoading,
                        timerStartTime: timerStartTime})
            return newState;
        case SET_UP_GAME_ERROR:
            return ({...state, setUpGameError: action.payload.error});

        case SPINNER_OFF:
            return ({...state, isLoading: action.payload})

        case HANDLE_CLICK:
            return {...state, currentGuess: action.payload}

        case RESET_GAME:
            return ({...initialState})

        case HANDLE_TIMER_START:
            return ({...state, handleTimerStarted: true});

        case HANDLE_TIMER_SUCCESS:
            console.log(action.payload)

            return ({...state,
                    timerStartTime: action.payload.timerStartTime,
                    timerRunOut: action.payload.timerRunOut,
                    handleTimerStarted: false})
        case HANDLE_TIMER_ERROR:
            return ({...state,
                    timerStartTime: null,
                    timerRunOut: false,
                    handleTimerStarted: false,
                    handleTimerError: action.payload.error})
        default:
            return state;
    }
}
