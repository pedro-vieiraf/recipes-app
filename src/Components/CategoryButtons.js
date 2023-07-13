import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LoginContext from './Context/Logincontext';

function CategoryButtons() {
  const { handleCategoryClick, handleClickAll } = useContext(LoginContext);
  const [categoryMeal, setCategoryMeal] = useState([]);
  const [categoryDrink, setCategoryDrink] = useState([]);

  const five = 5;
  const location = useLocation();

  useEffect(() => {
    const requestApi = async () => {
      if (location.pathname === '/meals') {
        const mealCategoryApi = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
        const fetchMeal = await fetch(mealCategoryApi);
        const response = await fetchMeal.json();
        const filteredMeal = response.meals;
        const resultMeal = filteredMeal.slice(0, five);
        setCategoryMeal(resultMeal);
      }
      if (location.pathname === '/drinks') {
        const drinkCategoryApi = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
        const fetchDrink = await fetch(drinkCategoryApi);
        const responses = await fetchDrink.json();
        const filteredDrink = responses.drinks;
        const resultDrink = filteredDrink.slice(0, five);
        setCategoryDrink(resultDrink);
      }
    };
    requestApi();
  });

  return (
    <div>
      {
        location.pathname === '/meals'
        && categoryMeal.map((meal, index) => (
          <button
            name={ meal.strCategory }
            key={ index }
            data-testid={ `${meal.strCategory}-category-filter` }
            onClick={ handleCategoryClick }
          >
            {meal.strCategory}
          </button>
        ))
      }
      {
        location.pathname === '/drinks'
        && categoryDrink.map((drink, index) => (
          <button
            name={ drink.strCategory }
            key={ index }
            data-testid={ `${drink.strCategory}-category-filter` }
            onClick={ handleCategoryClick }
          >
            {drink.strCategory}
          </button>
        ))
      }
      <button
        data-testid="All-category-filter"
        onClick={ handleClickAll }
      >
        All
      </button>
    </div>
  );
}

export default CategoryButtons;
