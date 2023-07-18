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
import RecipeDetails from './Components/RecipeDetails';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const history = useHistory();
  const [searchRadio, setSearchRadio] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [requestMeal, setRequestMeal] = useState([]);
  const [requestDrink, setRequestDrink] = useState([]);
  const [buttonMeal, setButtonMeal] = useState([]);
  const [buttonDrink, setButtonDrink] = useState([]);
  const [clear, setClear] = useState(false);

  const twelve = 12;

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

  const handleBtnBuscar = useCallback(async () => {
    if (searchRadio === 'firstLetter' && searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }
    if (location.pathname === '/meals') {
      const response = await requestMealFunctions[searchRadio](searchInput);
      const result = await response.meals;
      setRequestMeal(result);
      console.log(result);
      return result;
    }
    if (location.pathname === '/drinks') {
      const response = await requestDrinksFunctions[searchRadio](searchInput);
      const result = await response.drinks;
      setRequestDrink(result);
      console.log(result);
      return result;
    }
  }, [location.pathname, searchRadio, searchInput,
    setRequestMeal, setRequestDrink]);

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

  const handleClickAll = useCallback(async () => {
    setButtonMeal([]);
    setButtonDrink([]);
  }, [setButtonDrink, setButtonMeal]);

  const handleCategoryClick = useCallback(async ({ target }) => {
    const { name } = target;
    const mealsCategory = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`;
    const drinksCategory = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${name}`;

    if (location.pathname === '/meals') {
      const fetchMeals = await fetch(mealsCategory);
      const responseMeals = await fetchMeals.json();
      const responseFilterMeal = responseMeals.meals;
      const resultsMeals = responseFilterMeal.slice(0, twelve);
      setButtonMeal(resultsMeals);
    }

    if (location.pathname === '/drinks') {
      const fetchDrinks = await fetch(drinksCategory);
      const responseDrinks = await fetchDrinks.json();
      const responseFilterDrink = responseDrinks.drinks;
      const resultsDrinks = responseFilterDrink.slice(0, twelve);
      setButtonDrink(resultsDrinks);
    }
    if (clear === true) {
      setButtonDrink([]);
      setButtonMeal([]);
    } else {
      setClear(true);
    }
  }, [setButtonDrink, setButtonMeal, location.pathname, clear]);

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
      requestMeal,
      requestDrink,
      buttonDrink,
      buttonMeal,
      handleCategoryClick,
      handleClickAll,
    }),
    [email, password, handleChange,
      buttonDisabled, buttonStatus, handleBtnBuscar,
      searchRadio, searchInput, setSearchInput, setSearchRadio,
      requestMeal, requestDrink, buttonDrink,
      buttonMeal, handleCategoryClick, handleClickAll,
    ],
  );

  return (
    <LoginContext.Provider value={ context }>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Meals } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route
        exact
        path="/meals/:id"
        render={ (props) => <RecipeDetails { ...props } /> }
      />
      <Route
        exact
        path="/drinks/:id"
        render={ (props) => <RecipeDetails { ...props } /> }
      />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
    </LoginContext.Provider>
  );
}

export default App;
