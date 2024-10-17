import { useEffect, useState } from "react";
import Card from "./Card";
import './Game.css'
import GamePanel from './GamePanel'
import WinDisplay from "./WinDisplay";

function Game() {
    const [characterList, setCharacterList] = useState([])
    const [idClicked, setIdClicked] = useState([])
    const [cardsNumber, setCardsNumber] = useState(12)
    const [currentScore, setCurrentScore] = useState(0)
    const [currentRecord, setCurrentRecord] = useState(0)
    const [won, setWon] = useState(false)

    useEffect(() => {
        const baseUrl = "https://dragonball-api.com/api/characters?limit=55"

        function fetchCharacters() {
            fetch(baseUrl, {
                mode: 'cors'
            })
            .then(response => response.json())
            .then(data => {
                const shuffledList = data.items.sort(() => 0.5 - Math.random())
                setCharacterList(shuffledList.slice(0 , cardsNumber))
            })
        } 
        fetchCharacters()
    }, [cardsNumber])

    function addScore() {
        setCurrentScore(currentScore + 1)
    }

    function updateRecord() {
        if (currentScore+1 > currentRecord) {
            setCurrentRecord(currentScore+1)
        }
    }

    function clearRecord() {
        setCurrentRecord(0)
    }

    function clearScore() {
        setCurrentScore(0)
    }

    function clearIdClicked() {
        setIdClicked([])
    }

    function checkIfWin() {
        if (currentScore+1 >= cardsNumber) {
            setWon(true)
        }
    }

    function playAgain() {
        clearScore()
        clearIdClicked()
        setWon(false)
    }


    function clickHandler(id) {
        if (!idClicked.includes(id)) {
            setIdClicked([...idClicked, id])
            addScore()
            updateRecord()
            shuffleCharacters()
            checkIfWin()
        }
        else {
            playAgain()
        }
        
    }

    function shuffleCharacters() {
        const shuffledList = characterList.sort(() => 0.5 - Math.random())
        setCharacterList(shuffledList)
    }

    function changeDifficulty(cardNum) {
        setCardsNumber(cardNum)
    }

    function updateDifficulty(cardNum) {
        changeDifficulty(cardNum)
        clearIdClicked()
        clearScore()
        clearRecord()
    }


    return (
        <>
        <div className="board">
            {
            won ? 
            (<WinDisplay playAgain={playAgain}></WinDisplay>) :

                characterList.map((character) => {
                    return (
                        <Card key={character.id} name={character.name} imgSrc={character.image} onClick={() => clickHandler(character.id)}></Card>
                    )
                })
            
            }
        </div>
         <GamePanel currentScore={currentScore} recordScore={currentRecord} updateDifficulty={updateDifficulty}></GamePanel>
         </>
    )
}



export default Game