import React, { useState, useMemo, useCallback } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login';
import LoginContext from './Components/Context/Logincontext';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
// import Footer from './Components/Footer';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [valuesRadio, setValuesRadio] = useState('');
  const [valuesSearch, setValuesSearch] = useState('');
  const [meals, setMeals] = useState([]);

  const handleClick = useCallback(async () => {
    if (valuesRadio === 'ingredient') {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${valuesSearch}`);
      const data = await response.json();
      setMeals([data]);
    } else if (valuesRadio === 'name') {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${valuesSearch}`);
      const data = await response.json();
      setMeals([data]);
    } else if (valuesRadio === 'first-letter') {
      if (valuesSearch.length > 1) {
        global.alert('Sua busca deve conter somente 1 (um) caracter');
      } else {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${valuesSearch}`);
        const data = await response.json();
        setMeals([data]);
      }
    }
  }, [valuesRadio, valuesSearch]);

  const handleChangeSearch = useCallback(({ target }) => {
    const { value } = target;
    setValuesSearch(value);
  }, []);

  const handleChangeRadio = useCallback(({ target }) => {
    const { name } = target;
    setValuesRadio(name);
  }, []);

  const buttonStatus = useCallback(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordLength = 6;
    if (emailRegex.test(email) && password.length >= passwordLength) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email, password]);

  const handleChange = useCallback(({ target }) => {
    const { name, value } = target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    buttonStatus();
  }, [buttonStatus]);

  const context = useMemo(
    () => ({
      email,
      password,
      handleChange,
      buttonDisabled,
      buttonStatus,
      handleChangeSearch,
      handleClick,
      handleChangeRadio,
      meals,
    }),
    [email, password, handleChange,
      buttonDisabled, buttonStatus,
      handleChangeSearch, handleClick, handleChangeRadio, meals],
  );

  return (
    <LoginContext.Provider value={ context }>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Meals } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/meals/:id-da-receita" />
      <Route exact path="/drinks/:id-da-receita" />
      <Route exact path="/meals/:id-da-receita/in-progress" />
      <Route exact path="/drinks/:id-da-receita/in-progress" />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
    </LoginContext.Provider>
  );
}

export default App;
