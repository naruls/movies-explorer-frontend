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

function App() {
  const navigate = useNavigate();    

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isNavigationOpen, setIsNavigationOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [savedCards, setSavedCards] = React.useState([]);
  const [render, setRender] = React.useState(false);
  const [searchData, setSearchData] = React.useState([]);
  const [cardListBlockContent, setCardListBlockContent] = React.useState('');
  const [page, setPage] =  React.useState(0);
  const [isFormHaveError, setIsFormHaveError] = React.useState(false);

  const checkToken = React.useCallback(() => {
      const jwt = localStorage.getItem('token');
      if(jwt) {
        moviesAuth.getContent(jwt).then((res) => {
          if (res.data) {
            handleLogin();
            navigate('/movies');
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


  function getFilms(input) {
    setPage(0);
    setRender(true);
    apiMovies.getMovies()
      .then((data) => {
        setCards(data)
        if (input[0].value.length === 0) {
          setCardListBlockContent('Нужно ввести ключевое слово');
          return;
        } else if (!data.some(item => item.nameRU.toLowerCase().includes(input[0].value.toLowerCase()))) {
          setCardListBlockContent('Ничего не найдено')
          return;
        }
        setCardListBlockContent('');
      })
      .catch((err) => {
        console.log(err)
        setCardListBlockContent('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      })
      .finally(() => {
        setRender(false);
      })
  }

  function register(name, email, password) {
    moviesAuth.register(name, email, password).then((res) => {
      if(res){
        navigate('/signin');
      }
      else{
        setIsFormHaveError(true);
      }
    })
    .catch((err) => {
      setIsFormHaveError(true);
      console.log(err);
    })
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
  }

  function signOut(){
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate('/signin');
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
    apiMain.updateProfile(data, localStorage.token)
    .then((data) => {
      setCurrentUser( {...data.data} );
    })
    .catch((err) => {
      setIsFormHaveError(true);
      console.log(err)})
  }

  return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className='app'>
      <Routes>
        <Route path='/saved-movies' element={
            <ProtectedRoute
            loggedIn={loggedIn}>
              <SavedMovies 
                userSavedMovies={true}
                loggedIn={loggedIn} 
                setIsNavigationOpen={openNavigationMenu} 
                getFilms={getFilms} 
                setSearchData={setSearchData} 
                saveMovies={saveMovies}
                deleteMovies={deleteSavedMovies}
                render={render} 
                cardListBlockContent={cardListBlockContent} 
                searchData={searchData}
                cards={savedCards}
                addCard={addCard}
                page={page}
                savedCards={savedCards}
              />
          </ProtectedRoute>} 
          />
        <Route path='/movies' element={
            <ProtectedRoute
            loggedIn={loggedIn}>
              <Movies 
                userSavedMovies={false}
                loggedIn={loggedIn}
                setIsNavigationOpen={openNavigationMenu} 
                getFilms={getFilms} 
                setSearchData={setSearchData} 
                saveMovies={saveMovies}
                deleteMovies={deleteMovies}
                render={render} 
                cardListBlockContent={cardListBlockContent} 
                searchData={searchData}
                cards={cards}
                addCard={addCard}
                page={page}
                savedCards={savedCards}
                />
          </ProtectedRoute>} 
          />
        <Route path='/profile' element={
            <ProtectedRoute
            loggedIn={loggedIn}>
              <Profile 
              setIsNavigationOpen={openNavigationMenu}
              loggedIn={loggedIn}
              signOut={signOut}
              updateProfile={updateProfile}
              isFormHaveError={isFormHaveError}
              changeFormErrorStatus={changeFormErrorStatus}
              />
          </ProtectedRoute>} 
          />
        <Route path='/signin' element={<Login login={login} changeFormErrorStatus={changeFormErrorStatus} isFormHaveError={isFormHaveError}/>} />
        <Route path='/main' element={<Main loggedIn={loggedIn} setIsNavigationOpen={openNavigationMenu}/>} />
        <Route path='/signup' element={<Register register={register} changeFormErrorStatus={changeFormErrorStatus} isFormHaveError={isFormHaveError}/>} />
        <Route path="" element={<NotFound />} />
        <Route path="*" element={loggedIn ? <Navigate to='/movies' replace /> : <Navigate to="/main" replace />} />
      </Routes>
      <Navigation isNavigationOpen={isNavigationOpen} closeNavigationMenu={closeNavigationMenu}/>
    </div>
  </CurrentUserContext.Provider>
  );
}

export default App;
