import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LoginContext from '../Context/Logincontext';
import './RESULTS.css';

function DrinksResults() {
  const { requestDrink, buttonDrink } = useContext(LoginContext);

  const num = 12;

  const drinksNumber = requestDrink.slice(0, num);

  return (
    <div className="drinks-results-container">
      {
        buttonDrink.length === 0
          ? drinksNumber.map((drink, index) => (
            <div className="drink-card" key={ index }>
              <Link to={ `/drinks/${drink.idDrink}` }>
                <h1 data-testid={ `${index}-recipe-card` }>{drink.strDrink}</h1>
                <h2 data-testid={ `${index}-card-name` }>{ drink.strDrink }</h2>
                <img
                  className="drink-image"
                  src={ drink.strDrinkThumb }
                  alt={ drink.strDrink }
                  data-testid={ `${index}-card-img` }
                />
              </Link>
            </div>
          )) : buttonDrink.map((drink, index) => (
            <div className="drink-card" key={ index }>
              <Link to={ `/drinks/${drink.idDrink}` }>
                <h1 data-testid={ `${index}-recipe-card` }>{drink.strDrink}</h1>
                <h2 data-testid={ `${index}-card-name` }>{ drink.strDrink }</h2>
                <img
                  className="drink-image"
                  src={ drink.strDrinkThumb }
                  alt={ drink.strDrink }
                  data-testid={ `${index}-card-img` }
                />
              </Link>
            </div>
          ))
      }
    </div>
  );
}

export default DrinksResults;
