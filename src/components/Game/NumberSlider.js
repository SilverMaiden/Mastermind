import React, {useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {handleClick} from '../../actions/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// This component renders each of the slots from which a user can guess a number/rune, and dispatches actions
// depending on whether the user clicks the up or down arrows.
const NumberSlider = (props) => {

    const dispatch = useDispatch();

    const minRuneValue = useSelector(state => state.gameReducer.minRuneValue);
    const maxRuneValue = useSelector(state => state.gameReducer.maxRuneValue);
    const mapNumsToLetters = useSelector(state => state.gameReducer.mapNumsToLetters);

    const [card, setCard] = useState(0);
    // Called when the user clicks one of the up or down arrows to change a rune on screen.
    // Takes the position of that rune in the guess as input.
    const handleArrowClick = (direction, currentGuess, index, minRuneValue, maxRuneValue) => {
    let newArr = currentGuess
    if (direction === 'up') {
        newArr[index] = (newArr[index] === maxRuneValue ? minRuneValue : newArr[index] + 1);
        props.setCurrentGuess(newArr)
        setCard(newArr[index]);
    } else if (direction === 'down') {
        newArr[index] = (newArr[index] === minRuneValue ? maxRuneValue : newArr[index] - 1); // comment explaining ternary operator;
        props.setCurrentGuess(newArr)
        setCard(newArr[index]);
    } else {
        console.log('error');
    }
}


    const changeSlider = (direction) => {
        handleArrowClick(direction, props.currentGuess, props.index, minRuneValue, maxRuneValue)
        console.log(card)
        console.log(props.currentGuess)
        console.log([props.currentGuess[props.index]]);
    }

    return (
        <div className="inputDiv">
                <button className="btn" data-testid='up' onClick={() => changeSlider('up')}>
                <FontAwesomeIcon
                    icon="chevron-up"
                    size="2x"
                /></button>

             <p className="norse input">
                {mapNumsToLetters[card]}
            </p>
                <button className="btn down" data-testid='down' onClick={() => changeSlider('down')}>
                <FontAwesomeIcon
                    icon="chevron-down"
                    size="2x"
                /></button>
            </div>




    )
}

export default NumberSlider;
