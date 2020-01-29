import React, {useState, useEffect, useContext} from "react";
import axios from 'axios';
import {GameContext} from "../../contexts/GameContext";
import NumberSlider from "./NumberSlider";
import Countdown from 'react-countdown';
import Attempts from "./Attempts";
import AttemptHistory from "./AttemptHistory";
import Lose from "../Lose";
import Win from "../Win";

const Game = (props) => {
    const {data } = useContext(GameContext);
    const [gameState, setGameState] = useState({
        randomNums: [],
        timerRunOut: false,
        letters: ["a", "b", "c", "d", "e", "f","g", "h"],
        values: [0, 0, 0, 0],
        pass: false,
        attempts: 10,
        start: Date.now(),
    });

    //Destructured Values
    const { letters, values, randomNums, pass, attempts } = gameState;

    //
    //GET random numbers
    useEffect(() => {
        axios.get("https://www.random.org/integers/?num=4&min=1&max=6&col=1&base=10&format=plain&rnd=new")
            .then(response => {
                let arrayFormat = response.data.split("").filter(element => (
                    element in ["0", "1", "2", "3", "4", "5", "6", "7"]
                ))
                let intArr = arrayFormat.map(element => (
                    parseInt(element)
                ))

                setGameState({...gameState, randomNums: intArr })
            }).catch(error => {
                console.log(error.message);
            })

    }, [])

    const handleTimer = () => {
        setGameState({...gameState, timerRunOut: true})
    }

    const handleClickUp = (index) => {
        let newArr = gameState.values // the array of values, which we want to modify at a particular index.
        newArr[index] = (newArr[index] === 7 ? 0 : newArr[index] + 1)
        setGameState({...gameState, values: newArr})
    }

    const handleClickDown = (index) => {
            let newArr = gameState.values // the array of values, which we want to modify at a particular index.
            newArr[index] = (newArr[index] === 0 ? 7 : newArr[index] - 1)
            setGameState({...gameState, values: newArr})
    }

    const handleSubmit = () => {
        let correctPos = 0;
        let correctNums = 0;
        let updatedAttempts = attempts - 1;

        const positionCheck = (index) => {
                if (values[index] === randomNums[index]) {
                        correctPos += 1;
                        console.log(correctPos);
                    }
                }


        setGameState({...gameState, attempts: (gameState.attempts - 1)});

        randomNums.map(element => {
            if (randomNums.includes(element)) {
                correctNums += 1;
        }
        })


        positionCheck(0)
        positionCheck(1)
        positionCheck(2)
        positionCheck(3)
        console.log(`numbers in correct position: ${correctPos}`);
        console.log(`numbers in submission that are in the correct number: ${correctNums}`)
        console.log(`randomNums: ${randomNums[0]}, ${randomNums[1]}, ${randomNums[2]}, ${randomNums[3]}`)
        console.log(`attempts remaining: ${attempts}`)
        //Time to check for success!

        if (correctPos === 4) {
            setGameState({...gameState, pass: true})
        }
    }

    return (
        <div >
            {pass ? <Win /> :
                <div>
                    {attempts !== 0  && gameState.timerRunOut !== true ?
                        <div className="container">
                            <h1> This is the Game page</h1>
                            {console.log(data.hardMode)}
                            {data.hardMode ?
                                <Countdown date={gameState.start + 10000} onComplete={handleTimer} />
                            : <p> </p>}
                            {attempts === 10 ?
                                <h3> Enter the correct combination</h3> :
                                <h3>Pattern Not Matched.</h3>}

                            <h6> Attempts remaining: {attempts}</h6>
                            <div className="inputContainer">
                                <p className="norse input">
                                    <button onClick={() => handleClickUp(0)}>^</button>
                                    {letters[values[0]]}
                                    <button onClick={() => handleClickDown(0)}>v</button>
                                </p>

                                <p className="norse input">
                                    <button onClick={() => handleClickUp(1)}>^</button>
                                    {letters[values[1]]}
                                    <button onClick={() => handleClickDown(1)}>v</button>
                                </p>

                                <p className="norse input">
                                    <button onClick={() => handleClickUp(2)}>^</button>
                                    {letters[values[2]]}
                                    <button onClick={() => handleClickDown(2)}>v</button>
                                </p>

                                <p className="norse input">
                                    <button onClick={() => handleClickUp(3)}>^</button>
                                    {letters[values[3]]}
                                    <button onClick={() => handleClickDown(3)}>v</button>
                                </p>
                            </div>
                        <button onClick={handleSubmit}> submit</button>
                        </div>
                : <Lose />
                    } </div>
            }

            </div>


    )
}

export default Game;
