import React from 'react';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../Validation/Validation';

function Register(props) {
    const {values, handleChange, errors, isValid, resetForm} = useFormWithValidation();
    const [registerName, setRegisterName] = React.useState('');
    const [registerEmail, setRegisterEmail] = React.useState('');
    const [registerPassword, setRegisterPassword] = React.useState('');

    function nameChange(e) {
        handleChange(e);
        setRegisterName(e.target.value);
        props.changeFormErrorStatus();
    }

    function emailChange(e) {
        handleChange(e);
        setRegisterEmail(e.target.value);
        props.changeFormErrorStatus();
    }

    function passwordChange(e) {
        handleChange(e);
        setRegisterPassword(e.target.value);
        props.changeFormErrorStatus();
    }

    function handelSubmit(e) {
        e.preventDefault();
        props.register(registerName, registerEmail, registerPassword);
        resetForm();
    }

    return(
        <section className="register">
            <div className="register__content">
                <Link to="/main"><img className="register__logo" src={logo} alt="Логотип"/></Link>
                <p className="register__greeting">Добро пожаловать!</p>
                <form className="register__form" onSubmit={handelSubmit}>
                    <label className="register__input-label">Имя</label>
                    <input name="name" className="register__input" onChange={nameChange} required minLength="2" maxLength="40" type="text"/>
                    <span className="register__input-error">{errors.name}</span> 
                    <label className="register__input-label">E-mail</label>
                    <input name="email" className="register__input" onChange={emailChange} required type='email'/>
                    <span className="register__input-error">{errors.email}</span> 
                    <label className="register__input-label">Пароль</label>
                    <input name="password" className={props.isFormHaveError ? "register__input register__input_error" : "register__input"} onChange={passwordChange} required type='password' minLength="8"/>
                    {props.isFormHaveError ? <span className="register__input-error">Что-то пошло не так...</span> : <span className="register__input-error">{errors.password}</span>}
                    <button className={isValid ? "register__submit-button" : "register__submit-button_inactive"} disabled={isValid ? false : true}>Зарегистрироваться</button>
                </form>
                <p className="register__inform">Уже зарегистрированы?
                    <Link to="/signin" className="regiser__link" onClick={ props.changeFormErrorStatus}> Войти</Link>
                </p>
            </div>
        </section>
    );
}

export default Register;