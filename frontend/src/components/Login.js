import React from "react";
import Sign from "./Sign";
import { useState } from 'react'

export default function Login(props) {

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
        const values = { email, password };
        props.onAuthorization(values)
    }

    return (
        <Sign
            name='Login'
            title='Вход'
            buttonText='Войти'
            onSubmit={handleSubmit}
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