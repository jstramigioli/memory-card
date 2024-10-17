export default function WinDisplay({playAgain}) {
    return (
        <div className="win-display">
            <h1>You Won!</h1>
            <button onClick={playAgain}>Play again?</button>
        </div>
    )
}