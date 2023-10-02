import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useState } from 'react'


export default function EditAvatarPopup(props) {

    const currentUser = React.useContext(CurrentUserContext);
    const [avatar, setAvatar] = useState('');

    function handleChangeAvatar(evt) {
        setAvatar(evt.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar
        });
    }

    React.useEffect(() => {
        if (props.isOpen) {
            setAvatar(currentUser.avatar || '');
        }
    }, [currentUser, props.isOpen]);

    return (

        <PopupWithForm
            name='avatar'
            isOpen={props.isOpen}
            title='Обновить аватар'
            buttonText='Сохранить'
            onClose={props.onClose}
            onSubmit={handleSubmit}
            children={
                <>
                    <label className="popup__form-label">
                        <input type="url" className="popup__input" name="avatar" placeholder="Ссылка на картинку" required
                            id="avatar-input" value={avatar || ''} onChange={handleChangeAvatar} />
                        <span className="popup__input-error avatar-input-error">1</span>
                    </label>
                </>
            } />

    )
}