import Die from "../components/Die.jsx"
import {useState} from "react"
import { nanoid } from "nanoid"
/**
     * Challenge: Update the `hold` function to flip
     * the `isHeld` property on the object in the array
     * that was clicked, based on the `id` prop passed
     * into the function.
     * 
     * Hint: as usual, there's more than one way to 
     * accomplish this.
     */ 
    
export default function App() {
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
        setDiceArray(prevDiceArray => (generateAllNewDice()));
    }

    function hold(id) {
        setDiceArray((prevDiceArray) => {
            return prevDiceArray.map((die) => {
                return id === die.id ? {...die, isHeld: !die.isHeld} :
                                        die
            })
        })
    }

    const [diceArray, setDiceArray] = useState(generateAllNewDice());
    const dieComponentArray = diceArray.map((die) => {
        return (
        <Die  
            key={die.id} 
            id={die.id}
            value={die.value} 
            isHeld={die.isHeld}
            holdFunction={hold}/>)
    });
    return (
        <main>
            <div className="dice-container">
                {dieComponentArray}
            </div>
            <button id="roll" onClick={reRollDice}>Roll</button>
        </main>
    )
}