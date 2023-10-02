import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function Card({card, onCardClick, onCardDelete, onCardLike}) {

    const currentUser = React.useContext(CurrentUserContext);
    
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some((user) => user === currentUser._id);

    const likeButtonClassName = (`element__caption-button ${isLiked && 'element__caption-button_active'}`);

    function handleCardClick() {
        onCardClick(card)
    }
    function handleLikeClick() {
        onCardLike(card)
    }
    function handleDeleteClick() {
        onCardDelete(card)
    }

    return (

        <div className="element">
            <button className={isOwn ? `element__delete-button` : `element__delete-button, element__delete-button_hidden`} onClick={handleDeleteClick} />
            <img className="element__img" src={card.link} alt={card.name} onClick={handleCardClick} />
            <div className="element__caption">
                <h2 className="element__caption-title">{card.name}</h2>
                <div className="element__caption-like-section">
                    <button className={likeButtonClassName} type="button"  onClick={handleLikeClick}/>
                    <p className="element__caption-like-counter">{card.likes.length}</p>
                </div>
            </div>
        </div>

    );
}

