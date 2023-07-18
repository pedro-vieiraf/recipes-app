import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../Components/Header';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const history = useHistory();

  const redirectToRecipeDetails = (recipeId, recipeType) => {
    history.push(`/${recipeType}s/${recipeId}`);
  };

  useEffect(() => {
    const storedDoneRecipes = localStorage.getItem('doneRecipes');
    if (storedDoneRecipes) {
      setDoneRecipes(JSON.parse(storedDoneRecipes));
      setFilteredRecipes(JSON.parse(storedDoneRecipes));
    }
  }, []);

  const MESSAGE_DISPLAY_TIME = 2000;
  const copyUrl = useCallback((type, id) => {
    const url = `http://localhost:3000/${type}s/${id}`;
    navigator.clipboard.writeText(url);
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
    }, MESSAGE_DISPLAY_TIME);
  }, []);

  console.log(doneRecipes);
  const handleMealClick = () => {
    const applyClick = doneRecipes
      .filter((recipe) => Object.values(recipe).includes('meal'));
    setFilteredRecipes(applyClick);
  };

  const handleDrinkClick = () => {
    const applyClick = doneRecipes
      .filter((recipe) => Object.values(recipe).includes('drink'));
    setFilteredRecipes(applyClick);
  };

  const handleAllClick = () => {
    setFilteredRecipes(doneRecipes);
  };
  return (
    <div>
      <Header />
      <button
        data-testid="filter-by-all-btn"
        onClick={ handleAllClick }
      >
        All

      </button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ handleMealClick }
      >
        Meals

      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ handleDrinkClick }
      >
        Drinks

      </button>

      {filteredRecipes.map((recipe, index) => (
        <div
          key={ index }
        >
          <button
            type="button"
            onClick={ () => redirectToRecipeDetails(recipe.id, recipe.type) }
          >
            <img
              width={ 300 }
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
            />
          </button>

          <button
            type="button"
            onClick={ () => redirectToRecipeDetails(recipe.id, recipe.type) }
          >
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          </button>

          <p data-testid={ `${index}-horizontal-top-text` }>
            {`${recipe.nationality} - ${recipe.category}`}
          </p>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {recipe.alcoholic ? 'Alcoholic' : 'Non-Alcoholic'}
          </p>

          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>

          <button onClick={ () => copyUrl(recipe.type, recipe.id) }>
            <img
              src={ shareIcon }
              alt="Share Icon"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>

          {recipe.tags.map((tag, tagIndex) => (
            <span
              key={ tagIndex }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}
            </span>
          ))}
        </div>
      ))}
      {showMessage && <p data-testid="link-copied">Link copied!</p>}
    </div>
  );
}

export default DoneRecipes;
