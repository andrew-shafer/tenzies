import Die from "../components/Die.jsx"
import { useState } from "react"
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
import { nanoid } from "nanoid"

export default function App() {
    const [diceArray, setDiceArray] = useState(generateAllNewDice());
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

    function generateAllNewDice() {
        const diceArray = [];
        for (let i=0; i<10; i++) {
            diceArray.push({
                value: 1+Math.floor(Math.random()*6), 
                isHeld: false, 
                id: nanoid()});
        }
        return diceArray;
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
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {dieComponentArray}
            </div>
            <button id="roll" onClick={reRollDice}>{gameWon ? "New Game" : "Roll"}</button>
        </main>
    )
}