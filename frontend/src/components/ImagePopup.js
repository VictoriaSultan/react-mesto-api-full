const ImagePopup = (props) => {
    const { card, onClose, isOpen } = props;
    return (
        <div id="popup-show-image" className={`popup ${isOpen ? "popup__opened" : ""}`}>
            <div className="popup__background">
                <button className="popup__close" onClick={onClose}></button>
                <img className="popup__image" src={card ? card.link : "#"} alt={card ? card.name : ""} />
                <p className="popup__description">{card ? card.name : ""}</p>
            </div>
        </div>
    )
}

export default ImagePopup;