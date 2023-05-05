import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {
    return(
        <section className="movies-card">
            <div className="movies-card__content">
            {/* <div className="movies-card__validation-error">Ничего не найдено</div> */}
                <div className="movies-card__grid">
                    <MoviesCard />
                    <MoviesCard />
                    <MoviesCard />
                    <MoviesCard />
                    <MoviesCard />
                    <MoviesCard />
                </div>
                <button className="movies-card__open-button">Ещё</button>
            </div>
        </section>
    );
}

export default MoviesCardList;