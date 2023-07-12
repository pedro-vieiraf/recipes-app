import React, { useContext } from 'react';
import LoginContext from './Context/Logincontext';

function DrinksResults() {
  const { requestDrink } = useContext(LoginContext);

  const num = 12;

  const drinksNumber = requestDrink.slice(0, num);

  return (
    <div>
      {
        drinksNumber.map((drink, index) => (
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

export default DrinksResults;
