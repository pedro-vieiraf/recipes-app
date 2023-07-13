import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

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
        <h1 data-testid="profile-email">{ email != null ? email.email : [] }</h1>
      </div>
      <button
        data-testid="profile-done-btn"
        onClick={ () => handleButtonClick('done') }
      >
        Done Recipes

      </button>
      <button
        data-testid="profile-favorite-btn"
        onClick={ () => handleButtonClick('favorite') }
      >
        Favorite Recipes

      </button>
      <button
        data-testid="profile-logout-btn"
        onClick={ () => handleButtonClick('logout') }
      >
        Logout

      </button>
      <Footer />
    </div>
  );
}

export default Profile;
