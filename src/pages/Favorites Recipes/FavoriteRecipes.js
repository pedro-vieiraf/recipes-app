import React from 'react';
import Header from '../../Components/Header/Header';
import './FavoriteRecipes.css';

function FavoriteRecipes() {
  return (
    <div>
      <Header />
      <div
        className="favorite-recipes"
      >
        <h1
          className="favorite-recipes-title"
        >
          Your Favorites Recipes
        </h1>
      </div>
    </div>
  );
}

export default FavoriteRecipes;
