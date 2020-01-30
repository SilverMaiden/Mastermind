import React, {useState, useEffect, useContext} from "react";
import axios from 'axios';
import {GameContext} from "../../contexts/GameContext";
import NumberSlider from "./NumberSlider";
import Countdown from 'react-countdown';

//My components
import Instructions from "../Instructions.js";
import Timer from "../Timer.js";
import AttemptHistory from "./AttemptHistory";
import Lose from "../Lose";
import Win from "../Win";

//Fontawsome import for icons
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


// import fontawesome library
import '../../fontawesome.js';
const Game = (props) => {
    const {data} = useContext(GameContext);
    const [gameState, setGameState] = useState({
        randomNums: [],
        timerRunOut: false,
        letters: ["a", "b", "c", "d", "e", "f","g", "h"],
        values: [0, 0, 0, 0],
        pass: false,
        attempts: 10,
        start: "",
        history: [],
        loading: true,
    });

    //Destructured Values
    const { letters,
        values,
        randomNums,
        pass,
        attempts,
        history,
        loading
    } = gameState;

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

                setGameState({...gameState,
                             randomNums: intArr,
                             loading: false,
                             start: Date.now()
                })
            }).catch(error => {
                console.log(error.message);
            })

    }, [])

    const handleTimer = () => {
        setGameState({...gameState, timerRunOut: true});
    }

    const handleClickUp = (index) => {
        let newArr = gameState.values // the array of values, which we want to modify at a particular index.
        newArr[index] = (newArr[index] === 7 ? 0 : newArr[index] + 1);
        setGameState({...gameState, values: newArr});
    }

    const handleClickDown = (index) => {
            let newArr = gameState.values // the array of values, which we want to modify at a particular index.
            newArr[index] = (newArr[index] === 0 ? 7 : newArr[index] - 1);
            setGameState({...gameState, values: newArr});
    }

    const handleSubmit = () => {
        let correctPos = 0;
        let correctNums = 0;
        let numsArr = [];
        let updatedAttempts = attempts - 1;

        const positionCheck = (index) => {
                if (values[index] === randomNums[index]) {
                        correctPos += 1;
                        console.log(correctPos);
                    }
                }
        values.map(element => {
            if (randomNums.includes(element)) {
                correctNums += 1;
                //console.log("been hit")
                numsArr.push(element);
            }
        })

        positionCheck(0);
        positionCheck(1);
        positionCheck(2);
        positionCheck(3);
        if (correctPos > correctNums) {
            correctNums = correctPos;
        }
        console.log(numsArr);
        console.log(`numbers in correct position: ${correctPos}`);
        console.log(`numbers in submission that are in the correct number: ${correctNums}`);
        console.log(`randomNums: ${randomNums[0]}, ${randomNums[1]}, ${randomNums[2]}, ${randomNums[3]}`);
        console.log(`attempts remaining: ${attempts}`);

        const createHint = (nums, pos) => {
            if (nums >= pos && pos > 0) {
                return `One or more of your runes are in the chosen four, and ${pos}` + (pos>1 ? ` are` : ` is`) + ` in the right position.`
            } else if (nums === 0) {
                return `None of your runes are in the chosen four, and none are in the right position.`
            } else if (nums > 0 && pos === 0) {
                return `One or more of your runes are in the chosen four, but none are in the right position.`
            }


        }
        let update = [letters[values[0]] + letters[values[1]] + letters[values[2]] + letters[values[3]], createHint(correctNums, correctPos)];
        let updatedHistory = history; // unshifting history would try to modify the original string
        updatedHistory.unshift(update);


        //Set game state
        setGameState({...gameState,
                     attempts: (gameState.attempts - 1),
                     history: updatedHistory});


        //Time to check for success!
        if (correctPos === 4) {
            setGameState({...gameState, pass: true});
        }
    }
        const scroll = () => {
            let component = document.getElementsByClassName("history-component");
            console.log(component);
        }

        const scrollIcon = () => {
            if (history.length > 1) {
                return <FontAwesomeIcon
                                    icon="angle-double-down"
                                    size="3x"/>
            }
        }

        const rightComponent = () => {
            if (data.hardMode) {
                return <Timer startTime={gameState.start} handleTimer={handleTimer} />
            } else {
                return <Instructions/>
            }
        }

        const setUpGamePage = () => {
            if (attempts === 0 || gameState.timerRunOut) {
                return <Lose />;
            } else if (pass) {
                return <Win />;
            } else {
                return (
                    <div className="container-2">
                            <div className="subContainer">
                                <AttemptHistory history={history} />
                            </div>
                         <div className="container-3">
                            <div className="container-4">
                                {console.log(randomNums)}
                                 {attempts === 10 ?
                                    <h3> Enter the correct combination</h3> :
                                    <h3>Pattern Not Matched.</h3>}

                                <p> Attempts remaining: {attempts}</p>
                                <div className="inputContainer">
                                    <NumberSlider
                                        letters={letters}
                                        values={values}
                                        index={0}
                                        handleClickUp={handleClickUp
                                        } handleClickDown={handleClickDown}
                                    />
                                    <NumberSlider
                                        letters={letters}
                                        values={values}
                                        index={1}
                                        handleClickUp={handleClickUp}
                                        handleClickDown={handleClickDown}
                                    />
                                    <NumberSlider
                                        letters={letters}
                                        values={values}
                                        index={2}
                                        handleClickUp={handleClickUp}
                                        handleClickDown={handleClickDown}
                                    />
                                    <NumberSlider
                                        letters={letters}
                                        values={values}
                                        index={3}
                                        handleClickUp={handleClickUp
                                        } handleClickDown={handleClickDown}
                                    />
                            </div>
                            <button className="mainButtons" onClick={handleSubmit}> submit</button>
                            </div>
                        </div>
                        {rightComponent()}
                    </div>


                );
            }
        }



    return (
        <div className="game-page" >
            {loading ? <img src={"eclipse155px.svg"} alt="loading spinner" /> :
                <div className="container-1">
                    {setUpGamePage()}
                </div>
            }
        </div>
    )
}

export default Game;
