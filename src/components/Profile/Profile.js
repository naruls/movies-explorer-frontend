import Header from "../Header/Header";
import ChangeProfile from "../ChangeProfile/ChangeProfile";

function Profile(props) {
    return(
        <>
            <Header setIsNavigationOpen={props.setIsNavigationOpen}/>
            <ChangeProfile />
        </>
    );
}

export default Profile;