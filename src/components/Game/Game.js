import React, {useState, useContext} from "react";
import {GameContext} from "../../contexts/GameContext";
import NumberSlider from "./NumberSlider";
import Timer from "./Timer";
import Attempts from "./Attempts";
import Lose from "../Lose";
import Win from "../Win";

const Game = (props) => {
    const {data, addChosen} = useContext(GameContext);
    const [gameState, setGameState] = useState({
        rightNums: 0,
        rightPositions: 0,
        attempts: 10,
        pass: false,
        firstAttempt: true,
    });

    const [rightAnswers, setRightAnswers]= useState({
        first: false,
        second: false,
        third: false,
        fourth: false
    })
    console.log(gameState)


    const handleSubmit = () => {
        //Compare data.randomNums with data.chosenNums
        //Reset rightNums and rightPositions to 0
        //
        let firstAttemptSwitch;
        setGameState({...gameState, rightNums: 0, rightPositions: 0})
        if (gameState.firstAttempt === true) {
            firstAttemptSwitch = false;
        } else {
            firstAttemptSwitch = false;
        }

        //Initialize variables;
        let correctPositions = 0;
        let correctNums = 0;
        let valid = true;
        let validFirst = false;
        let validSecond = false
        let validThird = false;
        let validFourth = false;

        //Creating an array of answers the use has chosen
        //to be able to use array methods
        let chosenAnswersArr = [data.chosenNums.first,
            data.chosenNums.second,
            data.chosenNums.third,
            data.chosenNums.fourth
        ]

        //On submit, attempts will decrease by 1
        let updatedAttempts = gameState.attempts - 1;

        //Checking each position for correct answer
        if (data.randomNums[0] === data.chosenNums.first) {
            correctPositions += 1;
            validFirst = true;
        }
        if (data.randomNums[1] === data.chosenNums.second) {
            correctPositions += 1;
            validSecond = true;
        }

        if (data.randomNums[2] === data.chosenNums.third) {
            correctPositions += 1;
            validThird = true;
        }

        if (data.randomNums[3] === data.chosenNums.fourth) {
            correctPositions += 1;
            validFourth = true;
        }

        //Checking chosen answer for correctly chosen numbers (but not positions)
        chosenAnswersArr.forEach(num => {
            if (data.randomNums.includes(num)) {
                correctNums += 1;
            }
        })

        setRightAnswers({...rightAnswers,
                        first: validFirst,
                        second: validSecond,
                        third: validThird,
                        fourth: validFourth
        })

        setGameState({...gameState,
                     attempts: updatedAttempts,
                     rightNums: correctNums,
                     rightPositions: correctPositions,
                     firstAttempt: firstAttemptSwitch,
        });

        if (correctPositions === 4) {
            setGameState({...gameState, pass: true})
        } else {
            console.log("Sorry, you got it wrong.");
            console.log(`Attempts remaining: ${gameState.attempts}`)
        }
    }

    return (
        <div>
        {gameState.pass ? <Win /> :
            <div>
            {gameState.attempts !== 0 ?
                <div className="container">
                    <h1> This is the game page.</h1>
                    <Attempts data={gameState}/>

                    <div className="inputContainer">
                        <NumberSlider data={data} addChosen={addChosen} location={"first"} />
                        <NumberSlider data={data} addChosen={addChosen} location={"second"} />
                        <NumberSlider data={data} addChosen={addChosen} location={"third"} />
                        <NumberSlider data={data} addChosen={addChosen} location={"fourth"} />
                    </div>
                    <button onClick={handleSubmit}> Submit </button>
                </div> : <Lose />
            }
            </div>
        }
        </div>
    )
}

export default Game;
