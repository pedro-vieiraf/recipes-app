import React, { useState, useEffect, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import MealsResults from '../Results/MealsResults';
import DrinksResults from '../Results/DrinksResults';
import LoginContext from '../Context/Logincontext';
import './RECIPES.css';

function Recipes() {
  const [meals, setMeal] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [mealsResult, setMealsResult] = useState([]);
  const [drinksResult, setDrinksResult] = useState([]);

  const { requestMeal, setRequestMeal, requestDrink, setRequestDrink,
    buttonMeal, buttonDrink } = useContext(LoginContext);

  const location = useLocation();
  const num = 12;

  const food = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  const lush = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  useEffect(() => {
    const handleRequest = async () => {
      if (location.pathname === '/meals') {
        const requests = await fetch(food);
        const responses = await requests.json();
        const result = responses.meals;
        const filters = result.slice(0, num);
        setMeal(filters);
        setMealsResult(meals);
        setRequestDrink([]);
      }
      if (location.pathname === '/drinks') {
        const request = await fetch(lush);
        const response = await request.json();
        const results = response.drinks;
        const filter = results.slice(0, num);
        setDrinks(filter);
        setDrinksResult(drinks);
        setRequestMeal([]);
      }
    };

    handleRequest();
  }, [drinks, requestDrink, requestMeal, meals, location.pathname,
    setRequestMeal, setRequestDrink]);

  return (
    <div className="recipes-container">
      {
        requestMeal.length === 0 && buttonMeal.length === 0 ? (
          mealsResult.map((meal, index) => (
            <div key={ index } className="recipe-card">
              <Link to={ `/meals/${meal.idMeal}` }>
                <h1 data-testid={ `${index}-recipe-card` }>{meal.strMeal}</h1>
                <h2 data-testid={ `${index}-card-name` }>{meal.strMeal}</h2>
                <img
                  className="recipe-image"
                  src={ meal.strMealThumb }
                  alt={ meal.strMeal }
                  data-testid={ `${index}-card-img` }
                />
              </Link>
            </div>
          ))
        ) : (
          <MealsResults />
        )
      }

      {
        requestDrink.length === 0 && buttonDrink.length === 0 ? (
          drinksResult.map((drink, index) => (
            <div key={ index } className="recipe-card">
              <Link to={ `/drinks/${drink.idDrink}` }>
                <h1 data-testid={ `${index}-recipe-card` }>{drink.strDrink}</h1>
                <h2 data-testid={ `${index}-card-name` }>{drink.strDrink}</h2>
                <img
                  className="recipe-image"
                  src={ drink.strDrinkThumb }
                  alt={ drink.strDrink }
                  data-testid={ `${index}-card-img` }
                />
              </Link>
            </div>
          ))
        ) : (
          <DrinksResults />
        )
      }
    </div>
  );
}

export default Recipes;
