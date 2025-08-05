import Die from "../components/Die.jsx"
import { useState, useRef, useEffect } from "react"
import Confetti from 'react-confetti'
import { nanoid } from "nanoid"

export default function App() {
    const [diceArray, setDiceArray] = useState(() => generateAllNewDice());
    const rollRef = useRef(null);
    const dieComponentArray = diceArray.map((die) => {
        return (
            <Die  
                key={die.id} 
                id={die.id}
                value={die.value} 
                isHeld={die.isHeld}
                holdFunction={() => hold(die.id)}
            />
        )
    });
    let gameWon = false;

    if (diceArray.every(die => die.isHeld === true) &&
        diceArray.every(die => die.value === diceArray[0].value) ) {
        gameWon = true;
    }

    useEffect(() => {
        if (gameWon){
            rollRef.current.focus();
        }
    }, [gameWon]);

    function generateAllNewDice() {
        const diceArray = [];
        for (let i=0; i<10; i++) {
            diceArray.push({
                //value: 1+Math.floor(Math.random()*6), 
                value: 5,
                isHeld: false, 
                id: nanoid()});
        }
        return diceArray;
    }


    function setNewGame() {
        setDiceArray(prevDiceArray => generateAllNewDice())
    }


    function reRollDice() {
        setDiceArray(prevDiceArray => prevDiceArray.map(die => {
            return die.isHeld === false ? {...die, value:1+Math.floor(Math.random()*6)} : die
        }));
    }

    function hold(id) {
        setDiceArray(prevDiceArray => 
            prevDiceArray.map(die => {
                return id === die.id ? 
                    {...die, isHeld: !die.isHeld} : die
            })
        )
    }

    return (
        <main>
            {gameWon && <Confetti />}
            <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
            </div>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {dieComponentArray}
            </div>
            <button id="roll" ref={rollRef} onClick={gameWon ? setNewGame : reRollDice}>{gameWon ? "New Game" : "Roll"}</button>
        </main>
    )
}