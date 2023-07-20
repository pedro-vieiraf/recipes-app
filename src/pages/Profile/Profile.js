import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import './PROFILE.css';

function Profile() {
  const history = useHistory();
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('user');
    if (storedEmail) {
      setEmail(JSON.parse(storedEmail));
    }
  }, []);

  const handleButtonClick = useCallback((action) => {
    if (action === 'done') {
      history.push('/done-recipes');
    }
    if (action === 'favorite') {
      history.push('/favorite-recipes');
    }
    if (action === 'logout') {
      localStorage.clear();
      history.push('/');
    }
  }, [history]);

  return (
    <div>
      <Header />
      <div>
        <h1
          className="profile-email"
          data-testid="profile-email"
        >
          { email != null ? email.email : [] }

        </h1>
      </div>
      <div
        className="profile-btn-div"
      >
        <button
          className="done-btn"
          data-testid="profile-done-btn"
          onClick={ () => handleButtonClick('done') }
        >
          Done Recipes

        </button>
        <button
          className="favorite-btn"
          data-testid="profile-favorite-btn"
          onClick={ () => handleButtonClick('favorite') }
        >
          Favorite Recipes

        </button>
        <button
          className="logout-btn"
          data-testid="profile-logout-btn"
          onClick={ () => handleButtonClick('logout') }
        >
          Logout

        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
