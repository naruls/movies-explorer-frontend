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

import apiMovies from '../../utils/MoviesApi';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState('');
  const [isNavigationOpen, setIsNavigationOpen] = React.useState(false);

  return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className='app'>
      <Routes>
        <Route path='/saved-movies' element={
            <ProtectedRoute
            loggedIn={loggedIn}>
              <SavedMovies />
          </ProtectedRoute>} 
          />
        <Route path='/movies' element={
            <ProtectedRoute
            loggedIn={loggedIn}>
              <Movies />
          </ProtectedRoute>} 
          />
        <Route path='/profile' element={
            <ProtectedRoute
            loggedIn={loggedIn}>
              <Profile/>
          </ProtectedRoute>} 
          />
        <Route path='/signin' element={<Login />} />
        <Route path='/main' element={<Main/>} />
        <Route path='/signup' element={<Register />} />
        <Route path='/not-found' element={<NotFound />} />
        <Route exact path="*" element={loggedIn ? <Navigate to='/movies' replace /> : <Navigate to="/main" replace />} />
      </Routes>
      <Navigation isNavigationOpen={isNavigationOpen}/>
    </div>
  </CurrentUserContext.Provider>
  );
}

export default App;
