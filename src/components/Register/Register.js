import logo from '../../images/logo.svg'
import { Link } from 'react-router-dom';

function Register() {
    return(
        <section className="register">
            <div className="register__content">
                <img className="register__logo" src={logo} alt="Логотип"/>
                <p className="register__greeting">Добро пожаловать!</p>
                <form className="register__form">
                    <label className="register__input-label">Имя</label>
                    <input className="register__input" required/>
                    <label className="register__input-label">E-mail</label>
                    <input className="register__input" required/>
                    <label className="register__input-label">Пароль</label>
                    <input className="register__input" required/>
                    <span id="register-input-error" className="register__input-error">Что-то пошло не так...</span> 
                    <button className="register__submit-button">Зарегистрироваться</button>
                </form>
                <p className="register__inform">Уже зарегистрированы?
                    <Link to="/signin" className="regiser__link"> Войти</Link>
                </p>
            </div>
        </section>
    );
}

export default Register;