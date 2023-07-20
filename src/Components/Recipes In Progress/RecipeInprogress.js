import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LoginContext from '../Context/Logincontext';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import './INPROGRESS.css';

function RecipeInprogress() {
  const { recipe, setRecipe } = useContext(LoginContext);
  const [favoriteRecipe, setFavoriteRecipe] = useState(false);

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

  const bttFavorite = () => {
    const { pathname } = location;
    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    let newFavorite = [];
    if (favoriteRecipe === false) {
      if (pathname.includes('meals')) {
        newFavorite = {
          id: recipe.idMeal,
          type: 'meal',
          nationality: recipe.strArea,
          category: recipe.strCategory,
          alcoholicOrNot: '',
          name: recipe.strMeal,
          image: recipe.strMealThumb,
        };
      } if (pathname.includes('drinks')) {
        newFavorite = {
          id: recipe.idDrink,
          type: 'drink',
          nationality: '',
          category: recipe.strCategory,
          alcoholicOrNot: recipe.strAlcoholic,
          name: recipe.strDrink,
          image: recipe.strDrinkThumb,
        };
      }
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favorite, newFavorite]));
      setFavoriteRecipe(true);
    } else if (favoriteRecipe === true) {
      if (pathname.includes('meals')) {
        const favoriteRemove = favorite.filter((el) => el.id !== recipe.idMeal);
        localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRemove));
        setFavoriteRecipe(false);
      } if (pathname.includes('drinks')) {
        const favoriteRemove = favorite.filter((el) => el.id !== recipe.idDrink);
        localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRemove));
        setFavoriteRecipe(false);
      }
    }
  };

  return (
    <div
      className="recipe-in-progress-container"
    >
      <h1
        data-testid="recipe-title"
        className="recipe-title"
      >
        Recipe In Progress
      </h1>
      {
        receita.map((item, index) => (
          <>
            <br />
            <div key={ index }>
              <h1
                className="recipe-name"
                data-testid="recipe-title"
              >
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
                className="recipe-image"
                data-testid="recipe-photo"
              />
              <br />
              <br />
              <p
                className="recipe-category"
                data-testid="recipe-category"
              >
                Category:
                {' '}
                { item.strCategory }

              </p>

              <p
                className="recipe-instructions"
                data-testid="instructions"
              >
                <div>
                  { item.strInstructions }
                </div>
              </p>
            </div>
            <div
              className="ingredients-container"
            >
              <h1
                className="ingredients-title"
              >
                Ingredientes
              </h1>
              <div
                className="ingredients-list"
              >
                {
                  ingredients.map((item1, index1) => (
                    <div
                      key={ index1 }
                    >
                      <label
                        className="ingredient-label"
                        data-testid="ingredient-step"
                        htmlFor={ index1 }
                      >
                        <input
                          id={ index1 }
                          type="checkbox"
                          key={ index1 }
                          data-testid={ `${index1}-ingredient-step` }
                          onChange={ checkedInput }
                          className="ingredient-checkbox"
                        />
                        {item1[1]}
                      </label>
                    </div>
                  ))
                }
              </div>
            </div>
            <div
              className="buttons-container1"
            >
              <button
                data-testid="finish-recipe-btn"
                className="finish-recipe-button1"
              >
                Finalizar Receita
              </button>
              <button
                data-testid="share-btn"
                className="share-button1"
              >
                Compartilhar
              </button>
              <button
                data-testid="favorite-btn"
                className="favorite-button1"
                onClick={ bttFavorite }
              >
                <img
                  data-testid="favorite-btn"
                  src={
                    favoriteRecipe ? blackHeartIcon : whiteHeartIcon
                  }
                  alt="iconeHeart"
                />
              </button>

            </div>
          </>
        ))
      }
    </div>
  );
}

export default RecipeInprogress;
