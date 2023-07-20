import { useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Header from '../Components/Header/Header';

function FavoriteRecipes() {
  const [errorMessage, setErrorMessage] = useState('');
  const [isLinkCopied, setLinkCopied] = useState(false);
  const [typeFilter, setTypeFilter] = useState('all');
  const [favoriteRecipes, setFavoriteRecipes] = useState(() => {
    const storedRecipes = localStorage.getItem('favoriteRecipes');
    return storedRecipes ? JSON.parse(storedRecipes) : [];
  });

  const removeRecipesFromFavorites = (id) => {
    const updatedFavorites = favoriteRecipes.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
    setFavoriteRecipes(updatedFavorites);
  };

  const handleShareClick = async (type, id) => {
    const url = `http://localhost:3000/${type}s/${id}`;
    try {
      await navigator.clipboard.writeText(url);
      setLinkCopied(true);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Falha ao copiar a URL. Por favor, tente novamente.');
    }
  };

  const handleFilterChange = (type) => {
    setTypeFilter(type);
  };

  function getRecipeTopText(recipe) {
    if (recipe.type === 'drink') {
      return recipe.alcoholic ? 'Alcoholic' : 'Non-Alcoholic';
    }
    return `${recipe.nationality} - ${recipe.category}`;
  }

  const filterRecipesByType = favoriteRecipes.reduce((result, recipe) => {
    if (typeFilter === 'all' || recipe.type === typeFilter) {
      result.push(recipe);
    }
    return result;
  }, []);

  return (
    <div>
      <Header />
      <button
        data-testid="filter-by-all-btn"
        onClick={ () => handleFilterChange('all') }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ () => handleFilterChange('meal') }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => handleFilterChange('drink') }
      >
        Drinks
      </button>
      {filterRecipesByType.map((recipe, index) => (
        <div key={ recipe.id }>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <img
              width={ 144 }
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
            />
            <h1 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h1>
          </Link>

          {/* <p data-testid={ `${index}-horizontal-top-text` }>
            {recipe.type === 'drink'
              ? recipe.isAlcoholic
              : `${recipe.nationality} - ${recipe.category}`}
          </p> */}

          <p data-testid={ `${index}-horizontal-top-text` }>
            {getRecipeTopText(recipe)}
          </p>

          <button onClick={ () => handleShareClick(recipe.type, recipe.id) }>
            <img
              src={ shareIcon }
              alt="Share"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
          <button onClick={ () => removeRecipesFromFavorites(recipe.id) }>
            <img
              src={ blackHeartIcon }
              alt="Favorite"
              data-testid={ `${index}-horizontal-favorite-btn` }
            />
          </button>
        </div>
      ))}
      {isLinkCopied && <span data-testid="link-copied-favorite">Link copied!</span>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default FavoriteRecipes;
