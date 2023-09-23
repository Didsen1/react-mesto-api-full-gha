import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useState } from 'react'


export default function AddPlacePopup(props) {

    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    function hanldeChangeLink(evt) {
        setLink(evt.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onAddPlace({
            name: name,
            link: link,
        });
    }

    React.useEffect(() => {
        if (props.isOpen) {
            setName('')
            setLink('')
        }
    }, [props.isOpen]);


    return (

        <PopupWithForm
            name='add'
            isOpen={props.isOpen}
            title='Новое место'
            buttonText='Создать'
            onClose={props.onClose}
            onSubmit={handleSubmit}
            children={
                <>
                    <label className="popup__form-label">
                        <input type="text" className="popup__input" name="place" placeholder="Название" required minLength="2"
                            maxLength="30" id="place-input" value={name} onChange={handleChangeName} />
                        <span className="popup__input-error place-input-error">1</span>
                    </label>
                    <label className="popup__form-label">
                        <input type="url" className="popup__input" name="image" placeholder="Ссылка на картинку" required
                            id="image-input" value={link} onChange={hanldeChangeLink} />
                        <span className="popup__input-error image-input-error">1</span>
                    </label>
                </>
            } />

    )
}