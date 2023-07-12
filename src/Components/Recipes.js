import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Recipes() {
  const [meals, setMeal] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const location = useLocation();
  const num = 12;

  const food = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  const lush = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  useEffect(() => {
    const handleRequest = async () => {
      const requests = await fetch(food);
      const responses = await requests.json();
      const result = responses.meals;
      const filters = result.slice(0, num);
      setMeal(filters);
      const request = await fetch(lush);
      const response = await request.json();
      const results = response.drinks;
      const filter = results.slice(0, num);
      setDrinks(filter);
    };
    handleRequest();
  });

  return (
    <div>
      {
        location.pathname === '/meals'
        && meals.map((meal, index) => (
          <div key={ index }>
            <h1 data-testid={ `${index}-recipe-card` }>{meal.strMeal}</h1>
            <h2 data-testid={ `${index}-card-name` }>{ meal.strMeal }</h2>
            <img
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
              data-testid={ `${index}-card-img` }
            />
          </div>
        ))
      }
      {
        location.pathname === '/drinks'
        && drinks.map((drink, index) => (
          <div key={ index }>
            <h1 data-testid={ `${index}-recipe-card` }>{drink.strDrink}</h1>
            <h2 data-testid={ `${index}-card-name` }>{ drink.strDrink }</h2>
            <img
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
              data-testid={ `${index}-card-img` }
            />
          </div>
        ))
      }
    </div>
  );
}

export default Recipes;
