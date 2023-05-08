import React from "react";

import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList"

function Movies(props) {

    return(
      <div className="movies">
        <Header />
        <main className="movies__content">
          <SearchForm />
          <Preloader />
          <MoviesCardList />
        </main>
        <Footer />
      </div>
    );
}

export default Movies;