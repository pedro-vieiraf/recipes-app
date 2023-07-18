import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LoginContext from './Context/Logincontext';

function RecipeInprogress() {
  const { recipe, setRecipe } = useContext(LoginContext);

  const location = useLocation();

  const receita = [recipe];

  const ingredients = Object.entries(recipe).filter((item) => item[0]
    .includes('strIngredient') && item[1] !== null && item[1] !== '');

  useEffect(() => {
    const url = window.location.href;
    const id = url.split('/')[4];
    if (location.pathname.includes('meals')) {
      const fetchAPI = async () => {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const results = await response.json();
        setRecipe(results.meals[0]);
      };
      fetchAPI();
    } if (location.pathname.includes('drinks')) {
      const fetchAPI = async () => {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const results = await response.json();
        setRecipe(results.drinks[0]);
      };
      fetchAPI();
    }
  }, [setRecipe, location.pathname]);

  const checkedInput = ({ target }) => {
    const { checked } = target;
    if (checked) {
      target.parentNode.style.textDecoration = 'line-through solid rgb(0, 0, 0)';
    } else {
      target.parentNode.style.textDecoration = 'none';
    }
  };

  return (
    <div>
      <h1
        data-testid="recipe-title"
      >
        Recipe In Progress
      </h1>
      {
        receita.map((item, index) => (
          <>
            <div key={ index }>
              <h1 data-testid="recipe-title">
                {
                  location.pathname.includes('meals') ? item.strMeal
                    : item.strDrink
                }
              </h1>
              <img
                src={
                  location.pathname.includes('meals') ? item.strMealThumb
                    : item.strDrinkThumb
                }
                alt={
                  location.pathname.includes('meals') ? item.strMeal
                    : item.strDrink
                }
                data-testid="recipe-photo"
              />
              <p data-testid="recipe-category">{ item.strCategory }</p>
              <p data-testid="instructions">{ item.strInstructions }</p>
            </div>
            <div>
              <h1>
                Ingredientes
              </h1>
              {
                ingredients.map((item1, index1) => (
                  <div
                    key={ index1 }
                  >
                    <label
                      data-testid="ingredient-step"
                      htmlFor={ index1 }
                    >
                      <input
                        id={ index1 }
                        type="checkbox"
                        key={ index1 }
                        data-testid={ `${index1}-ingredient-step` }
                        onChange={ checkedInput }
                      />
                      {item1[1]}
                    </label>
                  </div>
                ))
              }
            </div>
            <button
              data-testid="finish-recipe-btn"
            >
              Finalizar Receita
            </button>
            <button
              data-testid="favorite-btn"
            >
              Favoritar
            </button>
            <button
              data-testid="share-btn"
            >
              Compartilhar
            </button>
          </>
        ))
      }
    </div>
  );
}

export default RecipeInprogress;
