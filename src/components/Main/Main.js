import Header from "../Header/Header";
import Promo from "../Promo/Promo";
import NavTab from "../NavTab/NavTab";
import Techs from "../Techs/Techs";
import AboutProject from "../AboutProject/AboutProject";
import AboutMe from "../AboutMe/AboutMe";
import Footer from "../Footer/Footer";

function Main(props) {
    return (
      <div className="main">
        <Header loggedIn={props.loggedIn} setIsNavigationOpen={props.setIsNavigationOpen} headerCss={true} />
        <Promo />
        <NavTab />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Footer />
        {/* <Navigation /> */}
      </div>
    );
  }
  
export default Main;
  