import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../Validation/Validation';

function ChangeProfile(props) {
    const {values, handleChange, errors, isValid, resetForm} = useFormWithValidation();
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')

    React.useEffect(() => {
        setName(`${currentUser.name}`);
        setEmail(`${currentUser.email}`);
      }, [`${currentUser.name}`, `${currentUser.email}`]);

    const nameD = currentUser.name;

    
    function changeName(evt) {
        handleChange(evt);
        setName(evt.target.value);
        props.changeFormErrorStatus();
    }

    function changeEmail(evt) {
        handleChange(evt);
        setEmail(evt.target.value);
        props.changeFormErrorStatus();
    }

    function handelSubmit(e) {
        e.preventDefault();
        props.updateProfile({name: name, email:email})
        resetForm();
    }

    return(
        <section className="profile">
            <div className="profile__content">
                <div className="profile__greeting">{`Привет, ${currentUser.name}!`}</div>
                <form className="profile__form" onSubmit={handelSubmit} noValidate >
                    <div className="profile__block-input">
                        <p className="profile__name-input">Имя</p>
                        <input name="name" className="profile__input" placeholder="Введите имя" value={name} onChange={changeName} required minLength="2" maxLength="40" type="text" />
                        <span className="profile__input-error">{errors.name}</span>
                    </div>
                    <div className="profile__block-input">
                        <p className="profile__name-input">E-mail</p>
                        <input name="email" className="profile__input" placeholder="Введите e-mail" value={email} onChange={changeEmail} required type="email" />
                        {props.isFormHaveError ? <span className="profile__input-error">Что-то пошло не так...</span> : <span className="profile__input-error">{errors.email}</span>}
                    </div>
                    <button className={(isValid&&(name!==currentUser.name||email!==currentUser.email)) ? "profile__change-button profile__button" : "profile__change-button_inactive"} disabled={(isValid&&(name!==currentUser.name||email!==currentUser.email)) ? false : true}>Редактировать</button>
                </form>
                <button className="profile__exit-button profile__button" onClick={props.signOut}>Выйти из аккаунта</button>
            </div>
        </section>
    );
}

export default ChangeProfile;
