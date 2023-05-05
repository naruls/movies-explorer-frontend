import logo from '../../images/logo.svg'
import { Link } from 'react-router-dom';

function Login() {
    return(
        <section className="login">
            <div className="login__content">
                <img className="login__logo" src={logo} alt="Логотип"/>
                <p className="login__greeting">Рады видеть!</p>
                <form className="login__form">
                    <label className="login__input-label">E-mail</label>
                    <input className="login__input" required/>
                    <label className="login__input-label">Пароль</label>
                    <input className="login__input" required/>
                    <span id="login-input-error" className="login__input-error">Что-то пошло не так...</span> 
                    <button className="login__submit-button">Войти</button>
                </form>
                <p className="login__inform">Ещё не зарегистрированы?
                    <a className="login__inform-link"><Link to="/signup" className="login__link"> Регистрация</Link></a>
                </p>
            </div>
        </section>
    );
}

export default Login;