import logo from '../images/logo.svg'
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function Header(props) {

    const location = useLocation();
    const [isMenuOpen, setMenuIsOpen] = React.useState(false);

    function handleToggleMenu() {
        setMenuIsOpen(!isMenuOpen);
    }

    function handleSignOut() {
        setMenuIsOpen(false);
        props.onSingOut();
    }

    return (
        <header className={props.loggedIn ? "header header_row-reverse" : "header"}>
            {props.loggedIn && (
                <div className={isMenuOpen ? 'header__container header__container_opened' : 'header__container'}>
                    <address className='header__email'>{props.userEmail}</address>
                    <button className='header__button' onClick={handleSignOut}>Выйти</button>
                </div>)}
            <div className='header__sign-container'>
                <img className="header__logo" src={logo} alt="Лого" />
                {props.loggedIn && (<button className={isMenuOpen ? 'header__menu-button header__menu-button_opened' : 'header__menu-button'} onClick={handleToggleMenu}></button>)}
                {!props.loggedIn && (<nav>{location.pathname === '/sign-in' && (<NavLink to="/sign-up" className={'header__navlink'}>Регистрация</NavLink>)} {location.pathname === '/sign-up' && (<NavLink to="/sign-in" className={'header__navlink'}>Войти</NavLink>)}</nav>)}
            </div>
        </header>
    );
}