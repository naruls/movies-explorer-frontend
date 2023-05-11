import React from 'react';
import logo from '../../images/logo.svg'
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../Validation/Validation';

function Login(props) {
    const {values, handleChange, errors, isValid, resetForm} = useFormWithValidation();
    const [loginEmail, setLoginEmail] = React.useState('');
    const [loginPassword, setLoginPassword] = React.useState('');

    function emailChange(e) {
        handleChange(e);
        setLoginEmail(e.target.value);
        props.changeFormErrorStatus();
    }

    function passwordChange(e) {
        handleChange(e);
        setLoginPassword(e.target.value);
        props.changeFormErrorStatus();
    }

    function handelSubmit(e) {
        e.preventDefault();
        props.login(loginEmail, loginPassword);
    }

    return(
        <section className="login">
            <div className="login__content">
                <Link to="/main"><img className="login__logo" src={logo} alt="Логотип"/></Link>
                <p className="login__greeting">Рады видеть!</p>
                <form className="login__form" onSubmit={handelSubmit}>
                    <label className="login__input-label">E-mail</label>
                    <input name="email" className="login__input" onChange={emailChange} type='email' required/>
                    <span className="login__input-error">{errors.email}</span> 
                    <label className="login__input-label">Пароль</label>
                    <input name="password" className={props.isFormHaveError ? "login__input login__input_error" : "login__input"} onChange={passwordChange} type='password' required minLength="8" />
                    {props.isFormHaveError ? <span className="login__input-error">Что-то пошло не так...</span> : <span className="login__input-error">{errors.password}</span>} 
                    <button className={isValid ? "login__submit-button" : "login__submit-button_inactive"} disabled={isValid ? false : true}>Войти</button>
                </form>
                <p className="login__inform">Ещё не зарегистрированы?
                    <Link to="/signup" className="login__link"> Регистрация</Link>
                </p>
            </div>
        </section>
    );
}

export default Login;