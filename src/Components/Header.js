import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

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
    <div>
      <h1 data-testid="page-title">
        {
          verify()
        }
      </h1>
      <Link
        to="/profile"
        // data-testid="profile-top-btn"
      >
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Icone"
        />
      </Link>
      {
        handlePath === 'Profile' || handlePath === done
        || handlePath === favorite
          ? ''
          : (
            <button
              onClick={ handleChange }
              // data-testid="btn-top-search"
            >
              <img
                data-testid="search-top-btn"
                src={ searchIcon }
                alt="Icone"
              />
            </button>
          )
      }
      {
        search
        && (
          <input
            data-testid="search-input"
            type="text"
          />
        )
      }
    </div>
  );
}

export default Header;
