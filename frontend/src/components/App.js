import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';

import api from '../utils/Api.js';
import auth from '../utils/Auth.js';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ConfirmPopup from './ConfirmPopup.js';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';
import InfoTooltip from './InfoTooltip.js';

export default function App() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [isSuccessSignUp, setIsSuccessSignUp] = useState(false);

    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);
    const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);

    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [chosenCard, setChosenCard] = useState({});
    const [userEmail, setUserEmail] = useState(null);

    const navigate = useNavigate();

    const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });

    useEffect(() => {
        if (loggedIn) {
            Promise.all([api.getUserInfo(), api.getInitialCards()])
                .then(([user, cards]) => {
                    setCurrentUser(user);
                    setCards(cards);
                })
                .catch((err) => console.log(err))
        }
    }, [loggedIn]);


    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    }

    function handleInfoTooltipOpen() {
        setInfoTooltipOpen(!isInfoTooltipOpen);
    }

    function handleEditProfileClick() {
        setEditProfilePopupOpen(!isEditProfilePopupOpen);
    }

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(!isAddPlacePopupOpen);
    }

    function closeAllPopups() {
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setConfirmPopupOpen(false);
        setInfoTooltipOpen(false);
        setSelectedCard({ name: '', link: '' });
    }

    function handleCardClick(card) {
        setSelectedCard({ name: card.name, link: card.link })
    }

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                const newCards = cards.map((c) => c._id === card._id ? newCard : c);
                setCards(newCards);
            })
            .catch((err) => console.log(err));
    }


    function handleCardDelete(evt) {
        evt.preventDefault();
        api.deleteCard(chosenCard._id).then(() => {
            const newCards = cards.filter((elem) => elem !== chosenCard)
            setCards(newCards);
            closeAllPopups();
        })
            .catch((err) => console.log(err));
    }

    function handleConfirmPopupOpen(card) {
        setChosenCard(card);
        setConfirmPopupOpen(!isConfirmPopupOpen);
    }

    function handleUpdateUser(data) {
        api.changeUserInfo(data)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function handleUpdateAvatar(data) {
        api.changeUserAvatar(data)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function handleAddPlaceSubmit(data) {
        api.addCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function handleSignOut() {
        setLoggedIn(false);
        localStorage.removeItem('jwt');
        navigate('/sign-in', { replace: true })
    }

    function handleRegistration(data) {
        auth.register(data)
            .then(
                (data) => {
                    setIsSuccessSignUp(true);
                    handleInfoTooltipOpen();
                    navigate('/sign-in', { replace: true })
                },
                (err) => {
                    console.log(err);
                    setIsSuccessSignUp(false);
                    handleInfoTooltipOpen();
                })
    }

    function handleAuthorization(data) {
        auth.authorize(data)
            .then(
                (data) => {
                    setLoggedIn(true);
                    localStorage.setItem('jwt', data.token);
                    navigate("/", { replace: true })
                    handleCheckToken();
                },
                (err) => {
                    console.log(err);
                }
            )
    }

    const handleCheckToken = useCallback(
        () => {
            const token = localStorage.getItem('jwt');
            auth.checkToken(token)
                .then(
                    (data) => {
                        setUserEmail(data.data.email);
                        setLoggedIn(true);
                        navigate("/", { replace: true })
                    },
                    (err) => {
                        console.log(err);
                    }
                )

        },
        [navigate],
    )

    useEffect(() => {
        const token = localStorage.getItem('jwt');

        if (token) {
            handleCheckToken();
        }
    }, [handleCheckToken])


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <>
                <Header loggedIn={loggedIn} onSingOut={handleSignOut} userEmail={userEmail} />
                <Routes>
                    <Route path="*" element={loggedIn ? <Navigate to="/sign-up" /> : <Navigate to="/sign-in" />} />
                    <Route path="/sign-up" element={<Register onRegistration={handleRegistration} />} />
                    <Route path="/sign-in" element={<Login onAuthorization={handleAuthorization} onCheckToken={handleCheckToken} />} />
                    <Route path="/" element={
                        <ProtectedRoute loggedIn={loggedIn}>
                            <Main
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onEditAvatar={handleEditAvatarClick}
                                onCardClick={handleCardClick}
                                onCardLike={handleCardLike}
                                onCardDelete={handleConfirmPopupOpen}
                                cards={cards}
                                userEmail={userEmail}
                                onSignOut={handleSignOut}
                            />
                        </ProtectedRoute>
                    } />
                </Routes>
                <Footer />
                <EditProfilePopup currentUser={currentUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
                <ConfirmPopup isOpen={isConfirmPopupOpen} onClose={closeAllPopups} onSubmit={handleCardDelete} />
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} isSuccess={isSuccessSignUp} />
            </>

        </CurrentUserContext.Provider>
    );
}