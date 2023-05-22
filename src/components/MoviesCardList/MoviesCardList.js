import MoviesCard from '../MoviesCard/MoviesCard';
import React from 'react';
import * as constants from '../../utils/constant';

function MoviesCardList(props) {
    const [cardCount, setCardCount] = React.useState(0);
    const [addValueCard, setAddValueCard] = React.useState(0);

    React.useEffect(() => {
        sizeCheck();
      });
    
    let arraySearchCard = props.cards.map((card) => { 
        if (!props.userSavedMovies) {
            if(card.nameRU.toLowerCase().includes(props.searchData[0].value.toLowerCase()) && props.searchData[0].value !== '' && props.searchData[1].value === false){
                return <MoviesCard key={card.id} card={card} saveMovies={props.saveMovies} savedCards={props.savedCards} deleteMovies={props.deleteMovies} userSavedMovies={props.userSavedMovies}/>;
            } else if (card.nameRU.toLowerCase().includes(props.searchData[0].value.toLowerCase()) && props.searchData[0].value !== '' && props.searchData[1].value === true && card.duration < constants.shortFilmsDuration) {
                return <MoviesCard key={card.id} card={card} saveMovies={props.saveMovies} savedCards={props.savedCards} deleteMovies={props.deleteMovies} userSavedMovies={props.userSavedMovies}/>;
            } return 0; 
        } else if (props.userSavedMovies) {
            if (props.searchData.length === 0 || props.searchData[0].value.length === 0) {
                return <MoviesCard key={card.movieId} card={card} saveMovies={props.saveMovies} savedCards={props.savedCards} deleteMovies={props.deleteMovies} userSavedMovies={props.userSavedMovies}/>;
            } else if (card.nameRU.toLowerCase().includes(props.searchData[0].value.toLowerCase()) && props.searchData[0].value !== '' && props.searchData[1].value === false) {
                return <MoviesCard key={card.movieId} card={card} saveMovies={props.saveMovies} savedCards={props.savedCards} deleteMovies={props.deleteMovies} userSavedMovies={props.userSavedMovies}/>;
            } else if (card.nameRU.toLowerCase().includes(props.searchData[0].value.toLowerCase()) && props.searchData[0].value !== '' && props.searchData[1].value === true && card.duration < constants.shortFilmsDuration) {
                return <MoviesCard key={card.movieId} card={card} saveMovies={props.saveMovies} savedCards={props.savedCards} deleteMovies={props.deleteMovies} userSavedMovies={props.userSavedMovies}/>;
            }
        }
   }).filter(card => card !== 0);

   function sizeCheck() {
        if (!props.userSavedMovies) {
            if (document.documentElement.clientWidth >= 1280) {
                setCardCount(constants.highResolutionCardOnScreenCount);
                setAddValueCard(constants.highResolutionCardAddCount);
            } else if (document.documentElement.clientWidth <= 1279 && document.documentElement.clientWidth >= 662) {
                setCardCount(constants.mediumResolutionCardOnScreenCount);
                setAddValueCard(constants.mediumResolutionCardAddCount);
            } else if (document.documentElement.clientWidth <= 661 && document.documentElement.clientWidth > 0) {
                setCardCount(constants.lowResolutionCardOnScreenCount);
                setAddValueCard(constants.lowResolutionCardAddCount);
            }
        } else if (props.userSavedMovies) {
            setCardCount(props.cards.length);
        }
   }

    return(
        <section className="movies-card">
            <div className="movies-card__content">
            <div className={props.cardListBlockContent.length !== 0 ? "movies-card__validation-error" : "movies-card__validation-error movies-card__validation-error_hidden"}>{props.cardListBlockContent}</div>
                <div className="movies-card__grid">
                   {
                   arraySearchCard.slice(0, cardCount+(addValueCard*props.page))
                   } 
                </div>
                <button className={arraySearchCard.length>cardCount+(addValueCard*props.page) ? "movies-card__open-button" : "movies-card__open-button movies-card__open-button_hidden"} onClick={props.addCard}>Ещё</button>
            </div>
        </section>
    );
}

export default MoviesCardList;