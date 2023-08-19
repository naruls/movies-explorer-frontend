import Header from "../Header/Header";
import ChangeProfile from "../ChangeProfile/ChangeProfile";
import ProfileChangePopup from "../ProfileChangePopup/ProfileChangePopup"

function Profile(props) {
    return(
        <>
            <ProfileChangePopup isChangeProfilePopupOpen={props.isChangeProfilePopupOpen} closeChangeProfilePopup={props.closeChangeProfilePopup}/>
            <Header loggedIn={props.loggedIn} setIsNavigationOpen={props.setIsNavigationOpen}/>
            <ChangeProfile 
            signOut={props.signOut} 
            updateProfile={props.updateProfile} 
            isFormHaveError={props.isFormHaveError} 
            changeFormErrorStatus={props.changeFormErrorStatus} 
            />
        </>
    );
}

export default Profile;