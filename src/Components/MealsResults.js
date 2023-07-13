import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LoginContext from './Context/Logincontext';

function MealsResults() {
  const { requestMeal, buttonMeal } = useContext(LoginContext);

  const num = 12;

  const mealsNumber = requestMeal.slice(0, num);

  return (
    <div>
      {
        buttonMeal.length === 0
          ? mealsNumber.map((meal, index) => (
            <div key={ index }>
              <Link
                to={ `/meals/${meal.idMeal}` }
              >
                <h1 data-testid={ `${index}-recipe-card` }>{meal.strMeal}</h1>
                <h2 data-testid={ `${index}-card-name` }>{ meal.strMeal }</h2>
                <img
                  src={ meal.strMealThumb }
                  alt={ meal.strMeal }
                  data-testid={ `${index}-card-img` }
                />
              </Link>
            </div>
          )) : buttonMeal.map((meal, index) => (
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
    </div>
  );
}

export default MealsResults;
