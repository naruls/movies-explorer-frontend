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
        <Header setIsNavigationOpen={props.setIsNavigationOpen} headerCss={true}/>
        <main className="main__content">
          <Promo />
          <NavTab />
          <AboutProject />
          <Techs />
          <AboutMe />
        </main>
        <Footer />
      </div>
    );
  }
  
export default Main;
  