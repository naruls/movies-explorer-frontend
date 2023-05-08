import Header from "../Header/Header";
import ChangeProfile from "../ChangeProfile/ChangeProfile";

function Profile(props) {
    return(
        <>
            <Header setIsNavigationOpen={props.setIsNavigationOpen}/>
            <main className="profile__content">
                <ChangeProfile />
            </main>
        </>
    );
}

export default Profile;