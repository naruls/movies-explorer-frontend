import exitButton from '../../images/exit-nav-button.svg';
import { Link } from 'react-router-dom';

function Navigation(props) {
    return(
        <section className={props.isNavigationOpen ? "navigation navigation_active" : "navigation"}>
            <div className={props.isNavigationOpen ? "navigation__background navigation__background_active" : "navigation__background"}></div>
            <div className="navigation__content">
                <button className="navigation__exit-button"><img className="navigation__exit-image" src={exitButton} alt="Закрыть" onClick={props.closeNavigationMenu}/></button>
                <ul className="navigation__navigate-buttons">
                    <li className="navigation__navigate-button navigation__button-main"><Link to="/main" className='navigation__link'>Главная</Link></li>
                    <li className="navigation__navigate-button navigation__button-movies"><Link to="/movies" className='navigation__link'>Фильмы</Link></li>
                    <li className="navigation__navigate-button navigation__button-save"><Link to="/save-movies" className='navigation__link'>Сохранённые фильмы</Link></li>
                    <li className="navigation__navigate-button navigation__button-account"><Link to="profile" className='navigation__link'>Аккаунт</Link></li>
                </ul>
            </div>
        </section>
    );
}

export default Navigation;