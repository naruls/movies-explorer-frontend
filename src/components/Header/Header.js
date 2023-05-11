import logo from '../../images/logo.svg'
import React from 'react';
import { Link } from 'react-router-dom'; 

function Header(props) {

    return (
      <header className={ props.headerCss ? 'header' : 'header_login' }>
        <div className='header__content'>
            <button className='header__button-logo'><Link to="/main"><img className='header__logo' src={logo} alt="Логотип" /></Link></button>
            { props.loggedIn ?
            <div className='header__buttons_login'>
              <button className='header__movies header__button_login'><Link to="/movies" className='header__link'>Фильмы</Link></button>
              <button className='header__save-movies header__button_login'><Link to="/saved-movies" className='header__link'>Сохранённые фильмы</Link></button>
              <button className='header__account header__button_login'><Link to="/profile" className='header__link'>Аккаунт</Link></button>
              <button className='header__menu-button' onClick={props.setIsNavigationOpen}></button>
            </div>
            :
            <div className='header__buttons'>
                <button className='header__register header__button'><Link to="/signup" className='header__link'>Регистрация</Link></button>
                <button className='header__login header__button'><Link to="/signin" className='header__link'>Войти</Link></button>
            </div>
            }
        </div>
      </header>
    );
  }
  
  export default Header;
  