import React, { useContext } from "react";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = (props) => {
    const { card, onCardClick, onCardLike, onCardDelete } = props;
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser._id;
    const isLiked = card.likes.some(i => i === currentUser._id);
    const cardDeleteButtonClassName = (
        `element__delete ${isOwn ? 'element__delete_visible' : 'element__delete_hidden'}`
      ); 
    const cardLikeButtonClassName = (
        `element__icon-heart ${isLiked ? 'element__icon-heart_active' : ''}`
    );

    const handleClick = () => {
        onCardClick(card);
    };

    const handleLikeClick = () => {
        onCardLike(card);
    };

    const handleDeleteClick = () => {
        onCardDelete(card);
    };

    return (
        <div className="element">
            <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
            <button className="element__open-image" onClick={handleClick}>
                <div className="element__image" style={{ backgroundImage: `url(${card.link})` }}></div>
            </button>
            <div className="element__container">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__heart-container">
                    <button className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <div className="element__heart-counter">{card.likes.length}</div>
                </div>
            </div>
        </div>
    )
}

export default Card;