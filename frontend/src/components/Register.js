import React from "react";
import Sign from "./Sign";
import { Link } from 'react-router-dom';
import { useState } from 'react'

export default function Register(props) {
    const linkMarkup = (
        <p className="sign__paragraf"> Уже зарегистрированы? <Link to="/sign-in" className={'header__navlink sign__navlink'}>Войти</Link></p>
    )

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleChangeEmail(evt) {
        setEmail(evt.target.value);
    }

    function hanldeChangePassword(evt) {
        setPassword(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        const values ={email, password};
        props.onRegistration(values)
    }

    return (
        <Sign
            name='Register'
            title='Регистрация'
            buttonText='Зарегистрироваться'
            onSubmit={handleSubmit}
            linkMarkup={linkMarkup}
            children={
                <>
                    <label className="popup__form-label sign__form-label">
                        <input type="email" className="popup__input sign__input" value={email || ''} onChange={handleChangeEmail} name="Email" placeholder="Email" required
                            minLength="2" maxLength="40" id="Email-input" />
                        <span className="popup__input-error Email-input-error">1</span>
                    </label>
                    <label className="popup__form-label sign__form-label">
                        <input type="password" className="popup__input sign__input" value={password || ''} onChange={hanldeChangePassword} name="password" placeholder="Пароль"
                            required minLength="2" maxLength="200" id="password-input" />
                        <span className="popup__input-error password-input-error">1</span>
                    </label>
                </>
            }

        />
    )
}