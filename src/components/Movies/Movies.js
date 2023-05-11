import React from "react";

import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList"

function Movies(props) {

    return(
      <div className="movies">
        <Header loggedIn={props.loggedIn} setIsNavigationOpen={props.setIsNavigationOpen}/>
        <SearchForm getFilms={props.getFilms} setSearchData={props.setSearchData} />
        <Preloader render={props.render} />
        <MoviesCardList 
          cardListBlockContent={props.cardListBlockContent} 
          searchData={props.searchData} 
          cards={props.cards}
          page={props.page}
          addCard={props.addCard} 
          saveMovies={props.saveMovies}
          deleteMovies={props.deleteMovies}
          savedCards={props.savedCards}
          userSavedMovies={props.userSavedMovies}
        />
        <Footer />
      </div>
    );
}

export default Movies;