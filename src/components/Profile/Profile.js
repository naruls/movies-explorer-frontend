import Header from "../Header/Header";
import ChangeProfile from "../ChangeProfile/ChangeProfile";

function Profile(props) {
    return(
        <>
            <Header loggedIn={props.loggedIn} setIsNavigationOpen={props.setIsNavigationOpen}/>
            <ChangeProfile signOut={props.signOut} updateProfile={props.updateProfile} isFormHaveError={props.isFormHaveError} changeFormErrorStatus={props.changeFormErrorStatus}/>
        </>
    );
}

export default Profile;