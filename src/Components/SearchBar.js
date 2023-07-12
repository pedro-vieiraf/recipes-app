import React, { useContext } from 'react';
import LoginContext from './Context/Logincontext';

export default function SearchBar() {
  const { searchRadio, searchInput, setSearchInput,
    handleRadio, handleBtnBuscar } = useContext(LoginContext);

  return (
    <div>
      <label htmlFor="search">
        <input
          type="text"
          name="search"
          id="search"
          data-testid="search-input"
          //   value="teste"
          value={ searchInput }
          onChange={ ({ target }) => { setSearchInput(target.value); } }
        />
      </label>
      <label htmlFor="ingredient">
        Ingrediente
        <input
          type="radio"
          id="ingredient"
          value="ingredient"
          data-testid="ingredient-search-radio"
          checked={ searchRadio === 'ingredient' }
          onChange={ handleRadio }
        />
      </label>
      <label htmlFor="name">
        Name
        <input
          type="radio"
          id="name"
          value="name"
          data-testid="name-search-radio"
          checked={ searchRadio === 'name' }
          onChange={ handleRadio }
        />
      </label>
      <label htmlFor="first-letter">
        First letter
        <input
          type="radio"
          id="first-letter"
          value="firstLetter"
          data-testid="first-letter-search-radio"
          checked={ searchRadio === 'firstLetter' }
          onChange={ handleRadio }
        />
      </label>
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ handleBtnBuscar }
      >
        Buscar
      </button>
    </div>
  );
}
