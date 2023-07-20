import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import SearchBar from '../Search Bar/SearchBar';
import './HEADER.css';

function Header() {
  const [search, setSearch] = useState(false);
  const handleChange = () => {
    if (search) {
      setSearch(false);
    } else {
      setSearch(true);
    }
  };
  const history = useHistory();
  const { location } = history;
  const { pathname } = location;
  const path = pathname.replace('/', '');
  const handlePath = path[0].toUpperCase() + path.substring(1);
  const done = 'Done-recipes';
  const favorite = 'Favorite-recipes';
  const verify = () => {
    if (handlePath === done) {
      return handlePath.replace('Done-recipes', 'Done Recipes');
    } if (handlePath === favorite) {
      return handlePath.replace('Favorite-recipes', 'Favorite Recipes');
    }
    return handlePath;
  };

  return (
    <div className="header-container">
      <h1
        className="header-title"
        data-testid="page-title"
      >
        {
          verify()
        }

      </h1>

      <Link to="/profile">
        <img
          className="header-profile"
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Icone"
        />
      </Link>

      {
        handlePath === 'Profile' || handlePath === done || handlePath === favorite ? (
          ''
        ) : (
          <button className="header-button" onClick={ handleChange }>
            <img
              className="header-icon"
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="Icone"
            />
          </button>
        )
      }
      {
        search && (
          <div className="search-bar-container">
            <SearchBar className="header-search-bar" />
          </div>
        )
      }
    </div>
  );
}

export default Header;
