function ChangeProfile() {
    return(
        <section className="profile">
            <div className="profile__content">
                <div className="profile__greeting">Привет, Кирилл!</div>
                <form className="profile__form">
                    <div className="profile__block-input">
                        <p className="profile__name-input">Имя</p>
                        <input className="profile__input" placeholder="Введите имя" required/>
                        </div>
                    <div className="profile__block-input">
                        <p className="profile__name-input">E-mail</p>
                        <input className="profile__input" placeholder="Введите e-mail" required/>
                    </div>
                    <button className="profile__change-button profile__button">Редактировать</button>
                </form>
                <button className="profile__exit-button profile__button">Выйти из аккаунта</button>
            </div>
        </section>
    );
}

export default ChangeProfile;