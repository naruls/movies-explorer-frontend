import exitButton from '../../images/exit-nav-button.svg';
import { NavLink } from 'react-router-dom';

function Navigation(props) {
    return(
        <section className={props.isNavigationOpen ? "navigation navigation_active" : "navigation"}>
            <div className={props.isNavigationOpen ? "navigation__background navigation__background_active" : "navigation__background"}></div>
            <div className="navigation__content">
                <button className="navigation__exit-button"><img className="navigation__exit-image" src={exitButton} alt="Закрыть" onClick={props.closeNavigationMenu}/></button>
                <ul className="navigation__navigate-buttons">
                    <li className="navigation__navigate-button navigation__button-main"><NavLink to="/main" className={({isActive}) => `${isActive ? "navigation__link-active" : "navigation__link"}`} onClick={props.closeNavigationMenu}>Главная</NavLink></li>
                    <li className="navigation__navigate-button navigation__button-movies"><NavLink to="/movies" className={({isActive}) => `${isActive ? "navigation__link-active" : "navigation__link"}`} onClick={props.closeNavigationMenu}>Фильмы</NavLink></li>
                    <li className="navigation__navigate-button navigation__button-save"><NavLink to="/saved-movies" className={({isActive}) => `${isActive ? "navigation__link-active" : "navigation__link"}`} onClick={props.closeNavigationMenu}>Сохранённые фильмы</NavLink></li>
                    <li className="navigation__navigate-button navigation__button-account"><NavLink to="profile" className='navigation__link' onClick={props.closeNavigationMenu}>Аккаунт</NavLink></li>
                </ul>
            </div>
        </section>
    );
}

export default Navigation;