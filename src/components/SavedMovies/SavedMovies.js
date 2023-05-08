import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList"

function SavedMovies(props) {

    return(
      <div className="saved-movies">
        <Header />
        <main className="saved-movies__content">
          <SearchForm />
          <Preloader />
          <MoviesCardList />
        </main>
        <Footer />
      </div>
    );
}

export default SavedMovies;