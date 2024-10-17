import './Card.css'

const Card = ({name, imgSrc, onClick}) => {
    return (
        <div className="card" onClick={onClick}>
            <img src={imgSrc} alt={name} />
            <h2>{name}</h2>
            
        </div>
    )
}

export default Card