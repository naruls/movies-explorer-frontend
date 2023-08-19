import logo from '../../images/promo-logo.svg'

function Promo() {
    return (
      <section className="promo">
        <div className="promo__content">
          <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
          <img className="promo__logo" src={logo} alt="Логотип" />
        </div>
      </section>
    );
  }
  
  export default Promo;
  