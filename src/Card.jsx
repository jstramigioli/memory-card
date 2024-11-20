import './Card.css'

const Card = ({name, imgSrc, onClick, flipped}) => {
    return (
        
            <div className={"card" + ' ' + (flipped ? 'flip' : 'unflip')} onClick={onClick}>
                <div className="front">
                    <img src={imgSrc} alt={name} />
                    <h2>{name}</h2>
                </div>
                <div className="back"></div>
            </div>
        
    )
}

export default Card