import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function Main(props) {
    
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="main">

            <section className="profile">

                <div className="profile__info-container">
                    <div className="profile__avatar" alt="Фото профиля" onClick={props.onEditAvatar} style={{ backgroundImage: `url(${currentUser.avatar})` }} ></div>
                    <div className="profile__info">
                        <div className="profile__info-container-crutch">
                            <h1 className="profile__info-title">{currentUser.name}</h1>
                            <button className="profile__info-edit-button" type="button" onClick={props.onEditProfile} />
                        </div>
                        <p className="profile__info-subtitle">{currentUser.about}</p>
                    </div>
                </div>
                <button className="profile__add-button" type="button" onClick={props.onAddPlace} />

            </section>

            <section className="elements">
                {props.cards.map((card) => (
                    <Card key={card._id} card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
                ))}
            </section>

        </main>
    );
} 