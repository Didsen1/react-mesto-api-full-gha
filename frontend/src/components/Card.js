import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function Card(props) {

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    function handleCardClick() {
        props.onCardClick(props.card)
    }
    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card)
    }

    return (

        <div className="element">
            <button className={isOwn ? `element__delete-button` : `element__delete-button, element__delete-button_hidden`} onClick={handleDeleteClick} />
            <img className="element__img" src={props.card.link} alt={props.card.name} onClick={handleCardClick} />
            <div className="element__caption">
                <h2 className="element__caption-title">{props.card.name}</h2>
                <div className="element__caption-like-section">
                    <button className={isLiked ? `element__caption-button element__caption-button_active` : `element__caption-button` } type="button"  onClick={handleLikeClick}/>
                    <p className="element__caption-like-counter">{props.card.likes.length}</p>
                </div>
            </div>
        </div>

    );
}