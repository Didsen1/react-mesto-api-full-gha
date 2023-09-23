import React from "react"
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useState } from 'react'

export default function EditProfilePopup(props) {

    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = useState( '' );
    const [description, setDescription] = useState( '' );

    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    function handleChangeDescription(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name: name,
            about: description,
        });
    }

    React.useEffect(() => {
        if (props.isOpen) {
          setName(currentUser.name || '');
          setDescription(currentUser.about || '');
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
                            required minLength="2" maxLength="200" id="subtitle-input" value={description || ""} onChange={handleChangeDescription} />
                        <span className="popup__input-error subtitle-input-error">1</span>
                    </label>
                </>
            }
        />

    )

}
