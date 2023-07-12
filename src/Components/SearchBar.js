import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { requestDrinkByFirstLetter, requestDrinkByIngredient,
  requestDrinkByName, requestMealByFirstLetter, requestMealByIngredient,
  requestMealByName } from '../service/RequestAPI';

export default function SearchBar() {
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

  return (
    <div>
      <label htmlFor="search">
        <input
          type="text"
          name="search"
          id="search"
          data-testid="search-input"
          //   value="teste"
          value={ searchInput }
          onChange={ ({ target }) => { setSearchInput(target.value); } }
        />
      </label>
      <label htmlFor="ingredient">
        Ingrediente
        <input
          type="radio"
          id="ingredient"
          value="ingredient"
          data-testid="ingredient-search-radio"
          checked={ searchRadio === 'ingredient' }
          onChange={ handleRadio }
        />
      </label>
      <label htmlFor="name">
        Name
        <input
          type="radio"
          id="name"
          value="name"
          data-testid="name-search-radio"
          checked={ searchRadio === 'name' }
          onChange={ handleRadio }
        />
      </label>
      <label htmlFor="first-letter">
        First letter
        <input
          type="radio"
          id="first-letter"
          value="firstLetter"
          data-testid="first-letter-search-radio"
          checked={ searchRadio === 'firstLetter' }
          onChange={ handleRadio }
        />
      </label>
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ handleBtnBuscar }
      >
        Buscar
      </button>
    </div>
  );
}
