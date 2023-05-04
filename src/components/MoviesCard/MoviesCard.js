import saveMovie from '../../images/save_movie.svg';
import React from 'react';
import saveMovieActive from '../../images/save_movie_active.svg';
import deleteSavedMovie from '../../images/delet_saved_movie.svg'

function MoviesCard(props) {

    const isSaved = props.savedCards.some((item) => {return item.movieId === props.card.id });
    const cardSavedImage = (isSaved ? saveMovieActive : saveMovie);

    function addMovies() {
        props.saveMovies(props.card);
    }

    function deleteMovies() {
        props.deleteMovies(props.card)
    }

    return(
        <div className="card">
            <a className='card__trailer-link' href={props.userSavedMovies ? props.card.trailer : props.card.trailerLink} target="_blank" rel='noreferrer'><div className="card__image" style={props.userSavedMovies ? { backgroundImage: `url('${props.card.image}')` } : { backgroundImage: `url('https://api.nomoreparties.co/${props.card.image.url}')` }}></div></a>
            <div className='card__bottom-panel'>
                <h6 className="card__name">{props.card.nameRU}</h6>
                <button className="card__button" onClick={props.userSavedMovies ? deleteMovies : isSaved ? deleteMovies : addMovies}>
                    <img className='card__button-image' src={props.userSavedMovies ? deleteSavedMovie : cardSavedImage} alt="картинка" />
                    </button>
                <p className="card__duration">{`${Math.floor(props.card.duration/60)}ч${props.card.duration % 60}м`}</p>
            </div>
        </div>
    );
}

export default MoviesCard;