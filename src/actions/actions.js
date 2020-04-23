import axios from 'axios';

export const SET_UP_GAME_START = 'SET_UP_GAME_START';
export const SET_UP_GAME_SUCCESS = 'SET_UP_GAME_SUCCESS';
export const SET_UP_GAME_ERROR = 'SET_UP_GAME_ERROR';

export const SET_MODE_START = 'SET_MODE_START';
export const SET_MODE_SUCCESS = 'SET_MODE_SUCCESS';
export const SET_MODE_ERROR = 'SET_MODE_ERROR';



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
                     isLoading: false,
                     timerStartTime: Date.now()
        }
        dispatch({type: SET_UP_GAME_SUCCESS, payload: changedState});
    }).catch(error => {
        dispatch({type: SET_UP_GAME_ERROR, payload: error});
    })

}
