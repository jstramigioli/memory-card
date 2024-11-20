import { useEffect, useState } from "react";
import Card from "./Card";
import './Game.css'
import GamePanel from './GamePanel'
import WinDisplay from "./WinDisplay";

function Game() {
    const [characterList, setCharacterList] = useState([])
    const [lastCharList, setLastCharList] = useState([])
    const [idClicked, setIdClicked] = useState([])
    const [cardsNumber, setCardsNumber] = useState(12)
    const [currentScore, setCurrentScore] = useState(0)
    const [currentRecord, setCurrentRecord] = useState(0)
    const [won, setWon] = useState(false)
    const [flipping, setFlipping] = useState(false)


    useEffect(() => {
        const baseUrl = "https://dragonball-api.com/api/characters?limit=55"

        function fetchCharacters() {
            fetch(baseUrl, {
                mode: 'cors'
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
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
            setLastCharList([...characterList])
            shuffleCharacters()
            checkIfWin()
        }
        else {
            playAgain()
        }
        
    }

    useEffect(() => {
        setTimeout(() => {
            setFlipping(false)
        }, 3000)
    },[flipping])


    function  shuffleCharacters () {
        
        setFlipping(true)
        /* const shuffledList = await characterList.sort(() => 0.5 - Math.random())
            setCharacterList(shuffledList) 
            
            setFlipping(false) */
            
       /* setTimeout(() => {
            const shuffledList = characterList.sort(() => 0.5 - Math.random())
            setCharacterList(shuffledList) 
            
           
            
        }, 200) */

        setTimeout(() => {
            const shuffledList = [...characterList].sort(() => 0.5 - Math.random())
            setCharacterList(shuffledList) 
            
            
        }, 2000)

       /*  setTimeout(() => {
            setFlipping(false)
        }, 3000)
      */
    }

    function checkIfSamePlace(currentCard, index) {
        const lastPosition = lastCharList.findIndex(card => currentCard.id === card.id)

        return (index == lastPosition)
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

                characterList.map((character, index) => {
                    return (
                        <Card 
                            key={character.id} 
                            name={character.name} 
                            imgSrc={character.image} 
                            onClick={() => clickHandler(character.id)} 
                            flipped={flipping}
                            samePlace={checkIfSamePlace(character, index)}
                            >
                        </Card>
                    )
                })
            
            }
        </div>
         <GamePanel currentScore={currentScore} recordScore={currentRecord} updateDifficulty={updateDifficulty}></GamePanel>
         </>
    )
}



export default Game