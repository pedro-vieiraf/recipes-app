import React, { useContext } from 'react';
import LoginContext from '../Context/Logincontext';
import './SEARCHBAR.css';

export default function SearchBar() {
  const { searchRadio, searchInput, setSearchInput,
    handleRadio, handleBtnBuscar } = useContext(LoginContext);

  return (
    <div
      className="search-bar"
    >
      <label
        className="search-label"
        htmlFor="search"
      >
        <input
          className="search-input"
          type="text"
          name="search"
          id="search"
          data-testid="search-input"
          value={ searchInput }
          onChange={ ({ target }) => { setSearchInput(target.value); } }
        />
      </label>
      <label
        className="search-label"
        htmlFor="ingredient"
      >
        Ingrediente
        <input
          className="search-input"
          type="radio"
          id="ingredient"
          value="ingredient"
          data-testid="ingredient-search-radio"
          checked={ searchRadio === 'ingredient' }
          onChange={ handleRadio }
        />
      </label>
      <label
        className="search-label"
        htmlFor="name"
      >
        Name
        <input
          className="search-input"
          type="radio"
          id="name"
          value="name"
          data-testid="name-search-radio"
          checked={ searchRadio === 'name' }
          onChange={ handleRadio }
        />
      </label>
      <label
        className="search-label"
        htmlFor="first-letter"
      >
        First letter
        <input
          className="search-input"
          type="radio"
          id="first-letter"
          value="firstLetter"
          data-testid="first-letter-search-radio"
          checked={ searchRadio === 'firstLetter' }
          onChange={ handleRadio }
        />
      </label>
      <button
        className="search-button"
        data-testid="exec-search-btn"
        type="button"
        onClick={ handleBtnBuscar }
      >
        Buscar
      </button>
    </div>
  );
}
