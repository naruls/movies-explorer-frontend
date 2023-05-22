import React from 'react';
import { Route, Routes, Navigate, useNavigate  } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import NotFound from '../NotFound/NotFound.js'
import Profile from '../Profile/Profile.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import Navigation from '../Navigation/Navigation.js';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';

import * as moviesAuth from '../../utils/Auth.js';

import apiMovies from '../../utils/MoviesApi';
import apiMain from '../../utils/MainApi';

import * as EmailValidator from 'email-validator';

function App() {
  const navigate = useNavigate();    

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isNavigationOpen, setIsNavigationOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [savedCards, setSavedCards] = React.useState([]);
  const [render, setRender] = React.useState(false);
  const [searchMovieSettings, setSearchMovieSettings] = React.useState([]);
  const [searchSavedMovieSettings, setSearchSavedMovieSettings] = React.useState([]);
  const [moviesCardListBlockContent, setMoviesCardListBlockContent] = React.useState('');
  const [savedMoviesCardListBlockContent, setsavedMoviesCardListBlockContent] = React.useState('');
  const [page, setPage] =  React.useState(0);
  const [isFormHaveError, setIsFormHaveError] = React.useState(false);
  const [isChangeProfilePopupOpen, setIsChangeProfilePopupOpen] = React.useState(false);

  const checkToken = React.useCallback(() => {
      const jwt = localStorage.getItem('token');
      if(jwt) {
        moviesAuth.getContent(jwt).then((res) => {
          if (res.data) {
            handleLogin();
          }
        })
        .catch((err) => { console.log(`Ошибка: ${err}`); }
        );
    }

}, []);


  React.useEffect(() => {
    checkToken();
  }, [checkToken]);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    getUserInfo(token);
    getMovies(token);
  }, []);

  React.useEffect(() => {
    const searchMovie = JSON.parse(localStorage.getItem('searchMovie'));
    if(searchMovie) {
      setSearchMovieSettings(searchMovie);
      getFilms(searchMovie);
    }
  }, []);

  function getUserInfo(token) {
    apiMain.getUserInfo(token)
      .then((data) => {
        setCurrentUser( {...data.data} );
      })
      .catch((err) => { 
        console.log(`Ошибка: ${err}`); 
    })
  }

  function getMovies(token) {
    apiMain.getMovies(token)
    .then((data) => {
      setSavedCards([...data.data])
    })
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  function openNavigationMenu() {
    setIsNavigationOpen(true);
  }

  function closeNavigationMenu() {
    setIsNavigationOpen(false);
  }

  function addCard() {
    setPage(page + 1);
  }

  function changeFormErrorStatus() {
    setIsFormHaveError(false);
  }

  function closeChangeProfilePopup() {
    setIsChangeProfilePopupOpen(false)
  }


  function getFilms(input) {
    setPage(0);
    setRender(true);
    apiMovies.getMovies()
      .then((data) => {
        setCards(data)
        if (input[0].value.length === 0) {
          setMoviesCardListBlockContent('Нужно ввести ключевое слово');
          return;
        } else if (!data.some(item => item.nameRU.toLowerCase().includes(input[0].value.toLowerCase()))) {
          setMoviesCardListBlockContent('Ничего не найдено')
          return;
        }
        setMoviesCardListBlockContent('');
      })
      .catch((err) => {
        console.log(err)
        setMoviesCardListBlockContent('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      })
      .finally(() => {
        setRender(false);
      })
  }
  
  function getSavedFilms(input) {
    setPage(0);
    setRender(true);
    apiMovies.getMovies()
      .then((data) => {
        setCards(data)
        if (input[0].value.length === 0) {
          setsavedMoviesCardListBlockContent('Нужно ввести ключевое слово');
          return;
        } else if (!savedCards.some(item => item.nameRU.toLowerCase().includes(input[0].value.toLowerCase()))) {
          setsavedMoviesCardListBlockContent('Ничего не найдено')
          return;
        }
        setsavedMoviesCardListBlockContent('');
      })
      .catch((err) => {
        console.log(err)
        setsavedMoviesCardListBlockContent('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      })
      .finally(() => {
        setRender(false);
      })
  }

  function register(name, email, password) { 
    if(EmailValidator.validate(email)){
      moviesAuth.register(name, email, password).then((res) => {
        if(res){
          login(email, password);
        }
        else{
          setIsFormHaveError(true);
        }
      })
      .catch((err) => {
        setIsFormHaveError(true);
        console.log(err);
      })
    } else {
      setIsFormHaveError(true);
      console.log(EmailValidator.validate(email))
    }
  }

  function login(email, password) {
    moviesAuth.authorize(email, password).then((data) => {
      if (data.token) {
        handleLogin();
        getUserInfo(data.token);
        getMovies(data.token);
        navigate('/movies'); 
      }
      else {
        setIsFormHaveError(true);
      }
    })
    .catch((err) => {
      setIsFormHaveError(true);
      console.log(err);
    })
  }

  function signOut(){
    localStorage.removeItem("token");
    localStorage.removeItem("searchMovie")
    setCards([]);
    setSavedCards([]);
    setSearchSavedMovieSettings([]);
    setSearchMovieSettings([]);
    setLoggedIn(false);
    navigate('/');
  }

  function saveMovies(item) {
    apiMain.saveMovie(item, localStorage.token)
    .then((data) => {
      setSavedCards([data.data, ...savedCards]);
    })
    .catch((err)=> console.log(err))
  }

  function deleteMovies(item) {
    const movie = savedCards.find((card) => card.movieId === item.id)
    apiMain.deleteMovie(movie._id, localStorage.token)
    .then((data) => {
      setSavedCards((state) => state.filter((c) => c !== movie))
    })
    .catch((err) => console.log(err))
  }

  function deleteSavedMovies(movie) {
    apiMain.deleteMovie(movie._id, localStorage.token)
    .then((data) => {
      setSavedCards((state) => state.filter((c) => c !== movie))
    })
    .catch((err) => console.log(err))
  }

  function updateProfile(data) {
    if(EmailValidator.validate(data.email)){
      apiMain.updateProfile(data, localStorage.token)
      .then((data) => {
        setIsChangeProfilePopupOpen(true);
        setCurrentUser( {...data.data} );
      })
      .catch((err) => {
        setIsFormHaveError(true);
        console.log(err)})
    }
    else {
      setIsFormHaveError(true);
    }
  }

  function returnFormSettings(formNode) {
    const { elements } = formNode
    const allInputData = Array.from(elements)
        .filter((item) => !!item.name)
        .map((element) => {
            const {name, type } = element;
            const value = type === 'checkbox' ? element.checked : element.value;
            return {name, value}
        })
    return allInputData;
  }

  function serializeSearchMoviesForm(formNode) {
    const allInputData = returnFormSettings(formNode);
    setSearchMovieSettings(allInputData);
    localStorage.setItem('searchMovie', JSON.stringify(allInputData));
    return allInputData;
  }

  function serializeSearchSavedMoviesForm(formNode) {
    const allInputData = returnFormSettings(formNode);
    setSearchSavedMovieSettings(allInputData);
    return allInputData;
  }

  return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className='app'>
      <Routes>
        <Route path='/saved-movies' element={
            <ProtectedRoute>
              <SavedMovies 
                userSavedMovies={true}
                loggedIn={loggedIn} 
                setIsNavigationOpen={openNavigationMenu} 
                getFilms={getSavedFilms} 
                setSearchData={setSearchSavedMovieSettings} 
                saveMovies={saveMovies}
                deleteMovies={deleteSavedMovies}
                render={render} 
                cardListBlockContent={savedMoviesCardListBlockContent} 
                searchData={searchSavedMovieSettings}
                cards={savedCards}
                addCard={addCard}
                page={page}
                savedCards={savedCards}
                serializeForm={serializeSearchSavedMoviesForm}
              />
          </ProtectedRoute>} 
          />
        <Route path='/movies' element={
            <ProtectedRoute>
              <Movies 
                userSavedMovies={false}
                loggedIn={loggedIn}
                setIsNavigationOpen={openNavigationMenu} 
                getFilms={getFilms} 
                setSearchData={setSearchMovieSettings} 
                saveMovies={saveMovies}
                deleteMovies={deleteMovies}
                render={render} 
                cardListBlockContent={moviesCardListBlockContent} 
                searchData={searchMovieSettings}
                cards={cards}
                addCard={addCard}
                page={page}
                savedCards={savedCards}
                serializeForm={serializeSearchMoviesForm}
                />
          </ProtectedRoute>} 
          />
        <Route path='/profile' element={
            <ProtectedRoute>
              <Profile 
              setIsNavigationOpen={openNavigationMenu}
              loggedIn={loggedIn}
              signOut={signOut}
              updateProfile={updateProfile}
              isFormHaveError={isFormHaveError}
              changeFormErrorStatus={changeFormErrorStatus}
              isChangeProfilePopupOpen={isChangeProfilePopupOpen}
              closeChangeProfilePopup={closeChangeProfilePopup}
              />
          </ProtectedRoute>} 
          />
        <Route path='/signin' element={loggedIn ? <Navigate to='/movies' replace /> : <Login login={login} changeFormErrorStatus={changeFormErrorStatus} isFormHaveError={isFormHaveError}/>} />
        <Route path='/main' element={<Main loggedIn={loggedIn} setIsNavigationOpen={openNavigationMenu}/>} />
        <Route path='/signup' element={loggedIn ? <Navigate to='/movies' replace /> : <Register register={register} changeFormErrorStatus={changeFormErrorStatus} isFormHaveError={isFormHaveError}/>} />
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={loggedIn ? <Navigate to='/movies' replace /> : <Navigate to="/main" replace />} />
      </Routes>
      <Navigation isNavigationOpen={isNavigationOpen} closeNavigationMenu={closeNavigationMenu}/>
    </div>
  </CurrentUserContext.Provider>
  );
}

export default App;
