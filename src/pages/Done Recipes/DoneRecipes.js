import React from 'react';
import Header from '../../Components/Header/Header';
import './DoneRecipes.css';

function DoneRecipes() {
  return (
    <div>
      <Header />
      <div
        className="done-recipes"
      >
        <h1
          className="done-recipes-title"
        >
          Your Finished Recipes
        </h1>
      </div>
    </div>
  );
}

export default DoneRecipes;
