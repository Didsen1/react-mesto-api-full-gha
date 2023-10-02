import React from "react"
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useState } from 'react'

export default function EditProfilePopup(props) {

    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = useState( '' );
    const [about, setAbout] = useState( '' );

    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    function handleChangeAbout(evt) {
        setAbout(evt.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about
        });
    }

    React.useEffect(() => {
        if (props.isOpen) {
          setName(currentUser.name || '');
          setAbout(currentUser.about || '');
        }
      }, [currentUser, props.isOpen]);

    return (
        <PopupWithForm
            onSubmit={handleSubmit} 
            name='profile'
            isOpen={props.isOpen}
            title='Редактировать профиль'
            buttonText='Сохранить'
            onClose={props.onClose}
            children={
                <>
                    <label className="popup__form-label">
                        <input type="text" className="popup__input" name="title" placeholder="Введите имя" required
                            minLength="2" maxLength="40" id="title-input" value={name || ""} onChange={handleChangeName} />
                        <span className="popup__input-error title-input-error">1</span>
                    </label>
                    <label className="popup__form-label">
                        <input type="text" className="popup__input" name="subtitle" placeholder="Введите название профессии"
                            required minLength="2" maxLength="200" id="subtitle-input" value={about || ""} onChange={handleChangeAbout} />
                        <span className="popup__input-error subtitle-input-error">1</span>
                    </label>
                </>
            }
        />

    )

}
