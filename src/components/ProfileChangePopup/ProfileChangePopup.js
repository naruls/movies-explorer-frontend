function ProfileChangePopup(props) {
    return(
            <div className={props.isChangeProfilePopupOpen ? "profileChangePopup" : "profileChangePopup profileChangePopup_hidden"}>
                <div className="profileChangePopup__overlay" onClick={props.closeChangeProfilePopup}></div>
                <div className="profileChangePopup__content">
                    <p className="profileChangePopup__title">Данные профиля успешно обновленны</p>
                    <button className="profileChangePopup__button" onClick={props.closeChangeProfilePopup}>Ок</button>
                </div>
            </div>
    );
}

export default ProfileChangePopup;
