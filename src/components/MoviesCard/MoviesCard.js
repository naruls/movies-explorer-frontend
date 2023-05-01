import saveMovie from '../../images/save_movie.svg';

function MoviesCard() {
    return(
        <div className="card">
            <div className="card__image"></div>
            <div className='card__bottom-panel'>
                <h6 className="card__name">33 слова о дизайне</h6>
                <button className="card__button"><img className='card__button-image' src={saveMovie} alt="картинка" /></button>
                <p className="card__duration">1ч42м</p>
            </div>
        </div>
    );
}

export default MoviesCard;