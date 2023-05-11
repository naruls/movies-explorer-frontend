import MoviesCard from '../MoviesCard/MoviesCard';
import React from 'react';

function MoviesCardList(props) {
    const [cardCount, setCardCount] = React.useState(0);
    const [addValueCard, setAddValueCard] = React.useState(0);

    React.useEffect(() => {
        sizeCheck();
      }, []);
    
    let arraySearchCard = props.cards.map((card) => { 
        if (!props.userSavedMovies) {
            if(card.nameRU.toLowerCase().includes(props.searchData[0].value.toLowerCase()) && props.searchData[0].value !== '' && props.searchData[1].value === false){
                return <MoviesCard key={card.id} card={card} saveMovies={props.saveMovies} savedCards={props.savedCards} deleteMovies={props.deleteMovies} userSavedMovies={props.userSavedMovies}/>;
            } else if (card.nameRU.toLowerCase().includes(props.searchData[0].value.toLowerCase()) && props.searchData[0].value !== '' && props.searchData[1].value === true && card.duration < 40) {
                return <MoviesCard key={card.id} card={card} saveMovies={props.saveMovies} savedCards={props.savedCards} deleteMovies={props.deleteMovies} userSavedMovies={props.userSavedMovies}/>;
            } return 0; 
        } else if (props.userSavedMovies) {
            if (props.searchData.length === 0 || props.searchData[0].value.length === 0) {
                return <MoviesCard key={card.movieId} card={card} saveMovies={props.saveMovies} savedCards={props.savedCards} deleteMovies={props.deleteMovies} userSavedMovies={props.userSavedMovies}/>;
            } else if (card.nameRU.toLowerCase().includes(props.searchData[0].value.toLowerCase()) && props.searchData[0].value !== '' && props.searchData[1].value === false) {
                return <MoviesCard key={card.movieId} card={card} saveMovies={props.saveMovies} savedCards={props.savedCards} deleteMovies={props.deleteMovies} userSavedMovies={props.userSavedMovies}/>;
            } else if (card.nameRU.toLowerCase().includes(props.searchData[0].value.toLowerCase()) && props.searchData[0].value !== '' && props.searchData[1].value === true && card.duration < 40) {
                return <MoviesCard key={card.movieId} card={card} saveMovies={props.saveMovies} savedCards={props.savedCards} deleteMovies={props.deleteMovies} userSavedMovies={props.userSavedMovies}/>;
            }
        }
   }).filter(card => card !== 0);

   function sizeCheck() {
        if (!props.userSavedMovies) {
            if (document.documentElement.clientWidth >= 1280) {
                setCardCount(12);
                setAddValueCard(4);
            } else if (document.documentElement.clientWidth <= 1279 && document.documentElement.clientWidth >= 662) {
                setCardCount(8);
                setAddValueCard(2);
            } else if (document.documentElement.clientWidth <= 661 && document.documentElement.clientWidth > 0) {
                setCardCount(5);
                setAddValueCard(2);
            }
        } else if (props.userSavedMovies) {
            if (document.documentElement.clientWidth >= 1280) {
                setCardCount(props.cards.length);
                setAddValueCard(4);
            } else if (document.documentElement.clientWidth <= 1279 && document.documentElement.clientWidth >= 662) {
                setCardCount(props.cards.length);
                setAddValueCard(2);
            } else if (document.documentElement.clientWidth <= 661 && document.documentElement.clientWidth > 0) {
                setCardCount(props.cards.length);
                setAddValueCard(2);
            }
        }
   }


   window.addEventListener("resize", () => {
        setTimeout(() => {sizeCheck()}, 1000)
   })


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