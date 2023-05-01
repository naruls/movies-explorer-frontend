import myPhoto from '../../images/1.png';
import arrow from '../../images/arrow.svg';

function AboutMe() {
    return(
        <section className="about-me" id='about-me'>
            <div className="about-me__content">
                <h2 className="about-me__title">Студент</h2>
                <div className="about-me__presentation">
                    <h3 className="about-me__name">Кирилл</h3>
                    <h6 className="about-me__paragraph">Фронтенд-разработчик, 22 года</h6>
                    <p className="about-me__description">Я родился в Мурмонсокй области, Кандалакшский район,
                    посёлок Алакуртти. С 12 лет живу в Санкт-Петербурге. Закончил СПГУТ им. Бонч-Бруевича по 
                    направлению ИКСС. Сейчас продолжаю обучение по курсу магистра на направлении ИКТМ.</p>
                    <div className="about-me__links">
                        <a className="about-me__link" target="_blank" href='https://vk.com/nihaenkokirill' rel='noreferrer'>VK</a>
                        <a className="about-me__link" target="_blank" href='https://github.com/naruls' rel='noreferrer'>Github</a>
                    </div>
                    <img className="about-me__image" src={myPhoto} alt="фотография автора" />
                </div>
                <div className="about-me__works">
                    <p className="about-me__portfolio">Портфолио</p>
                    <div className="about-me__sites">
                        <a className="about-me__site" target="_blank" href='https://vk.com/nihaenkokirill' rel='noreferrer'>
                            <p className="about-me__site-name">Статичный сайт</p>
                            <img className="about-me__site-arrow" src={arrow} alt="ссылка" />
                        </a>
                        <a className="about-me__site" target="_blank" href='https://vk.com/nihaenkokirill' rel='noreferrer'>
                            <p className="about-me__site-name">Адаптивный сайт</p>
                            <img className="about-me__site-arrow" src={arrow} alt="ссылка" />
                        </a>
                        <a className="about-me__site" target="_blank" href='https://vk.com/nihaenkokirill' rel='noreferrer'>
                            <p className="about-me__site-name">Одностраничное приложение</p>
                            <img className="about-me__site-arrow" src={arrow} alt="ссылка" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutMe;