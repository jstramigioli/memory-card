import './GamePanel.css'

export default function GamePanel({currentScore, recordScore, updateDifficulty}) {



    return (
        <footer>
            <button onClick={() => updateDifficulty(6)}>Easy</button>
            <button onClick={() => updateDifficulty(12)}>Medium</button>
            <button onClick={() => updateDifficulty(18)}>Hard</button>
            <h1>Current Score: {currentScore}</h1>
            <h1>Record: {recordScore}</h1>
        </footer>
    )
}
