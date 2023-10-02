import React, { useState, useEffect, useCallback } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';

import api from "../utils/Api";
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
        const token = localStorage.getItem('jwt');
        if (token) {
            Promise.all([api.getUserInfo(token), api.getInitialCards(token)])
                .then(([userData, cardList]) => {
                    setCurrentUser(userData.user);
                    setCards(cardList.data.reverse());
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
        const isLiked = card.likes.some((user) => user === currentUser._id);

        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCards((state) =>
                    state.map((c) => (c._id === card._id ? newCard.data : c))
                )
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

    function handleUpdateUser({ name, about }) {
        api.changeUserInfo({ name, about })
            .then((userData) => {
                setCurrentUser(userData.user);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function handleUpdateAvatar(data) {
        api.changeUserAvatar(data)
            .then((userData) => {
                setCurrentUser(userData.user);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function handleAddPlaceSubmit({name, link}) {
        api.addCard({name, link})
            .then((newCard) => {
                setCards([newCard.data, ...cards]);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    const handleCheckToken = useCallback(
        () => {
            const jwt = localStorage.getItem('jwt');
            auth.checkToken(jwt)
                .then(
                    (userData) => {
                        setLoggedIn(true);
                        setUserEmail(userData.user.email);
                        navigate("/", { replace: true })
                    },
                    (err) => {
                        console.log(err);
                        localStorage.clear();
                    }
                )
        },
        [navigate],
    )

    useEffect(() => {
        handleCheckToken();
    }, [handleCheckToken])

    function handleRegistration({ email, password }) {
        auth.register({ email, password })
            .then(() => {
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

    function handleAuthorization({ email, password }) {
        auth.authorize({ email, password })
            .then(() => {
                setLoggedIn(true);
                navigate("/", { replace: true })
                handleCheckToken();
            },
                (err) => {
                    console.log(err);
                }
            )
    }

    function handleSignOut() {
        setLoggedIn(false);
        localStorage.removeItem("loggedIn");
        localStorage.removeItem('jwt');
        navigate('/sign-in', { replace: true })
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <>
                <Header loggedIn={loggedIn} onSingOut={handleSignOut} userEmail={userEmail} />
                <Routes>
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
                                onSignOut={handleSignOut}
                            />
                        </ProtectedRoute>
                    } />
                    <Route path="/sign-up" element={<Register onRegistration={handleRegistration} />} />
                    <Route path="/sign-in" element={<Login onAuthorization={handleAuthorization} />} />
                    <Route path="*" element={loggedIn ? <Navigate to="/sign-up" /> : <Navigate to="/sign-in" />} />
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