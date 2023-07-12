import React, { useState, useMemo, useCallback, useEffect } from 'react';
import './App.css';
import { Route, useHistory, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login';
import LoginContext from './Components/Context/Logincontext';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import { requestDrinkByFirstLetter, requestDrinkByIngredient,
  requestDrinkByName, requestMealByFirstLetter, requestMealByIngredient,
  requestMealByName } from './service/RequestAPI';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const history = useHistory();
  const [searchRadio, setSearchRadio] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [requestMeal, setRequestMeal] = useState([]);
  const [requestDrink, setRequestDrink] = useState([]);

  const requestMealFunctions = {
    ingredient: requestMealByIngredient,
    name: requestMealByName,
    firstLetter: requestMealByFirstLetter,
  };
  const requestDrinksFunctions = {
    ingredient: requestDrinkByIngredient,
    name: requestDrinkByName,
    firstLetter: requestDrinkByFirstLetter,
  };

  const location = useLocation();
  const handleRadio = ({ target }) => {
    setSearchRadio(target.value);
  };

  useEffect(() => {
    if (requestMeal.length === 1) {
      history.push(`/meals/${requestMeal[0].idMeal}`);
    }
    if (requestDrink.length === 1) {
      history.push(`/drinks/${requestDrink[0].idDrink}`);
    }
  }, [requestDrink, requestMeal, history]);

  const handleBtnBuscar = () => {
    if (searchRadio === 'firstLetter' && searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }
    if (location.pathname === '/meals') {
      requestMealFunctions[searchRadio](searchInput)
        .then((r) => {
          setRequestMeal(r.meals);
        });
    }
    if (location.pathname === '/drinks') {
      requestDrinksFunctions[searchRadio](searchInput)
        .then((r) => {
          setRequestDrink(r.drinks);
        });
    }
  };

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
      handleBtnBuscar,
      searchRadio,
      searchInput,
      setSearchInput,
      setSearchRadio,
      handleRadio,
    }),
    [email, password, handleChange,
      buttonDisabled, buttonStatus, handleBtnBuscar,
      searchRadio, searchInput, setSearchInput, setSearchRadio],
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
