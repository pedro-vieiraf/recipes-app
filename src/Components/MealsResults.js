import React, { useContext } from 'react';
import LoginContext from './Context/Logincontext';

function MealsResults() {
  const { requestMeal } = useContext(LoginContext);

  const num = 12;

  const mealsNumber = requestMeal.slice(0, num);

  return (
    <div>
      {
        mealsNumber.map((meal, index) => (
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
