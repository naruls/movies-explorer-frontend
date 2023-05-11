function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <div className="about-project__content">
        <h2 className="about-project__title">О проекте</h2>
        <div className="about-project__table">
            <div className="about-project__table-element">
                <h6 className="about-project__table-title">Дипломный проект
                включал 5 этапов</h6>
                <p className="about-project__table-paragraph">Составление плана,
                работу над бэкендом, вёрстку, добавление функциональности 
                и финальные доработки.</p>
            </div>
            <div className="about-project__table-element">
                <h6 className="about-project__table-title">На выполнение диплома
                ушло 5 недель</h6>
                <p className="about-project__table-paragraph">У каждого этапа
                был мягкий и жёсткий дедлайн, которые нужно было
                  соблюдать, чтобы успешно защититься.</p>
            </div>
        </div>
        <div className="about-project__roadmap">
            <div className="about-project__grid-element">1 неделя</div>
            <div className="about-project__grid-element">4 недели</div>
            <div className="about-project__grid-element">Back-end</div>
            <div className="about-project__grid-element">Front-end</div>
        </div>
      </div>  
    </section>
  );
}

export default AboutProject;

  