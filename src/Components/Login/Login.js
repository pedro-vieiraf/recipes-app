import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import LoginContext from '../Context/Logincontext';
import './LOGIN.css';

function Login() {
  const { email, password, handleChange, buttonDisabled } = useContext(LoginContext);
  const history = useHistory();

  function saveEmail() {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  }

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <label className="login-label" htmlFor="email">
        <input
          className="login-input"
          onChange={ handleChange }
          data-testid="email-input"
          type="email"
          name="email"
          value={ email }
        />
      </label>
      <label className="login-label" htmlFor="password">
        <input
          className="login-input"
          onChange={ handleChange }
          name="password"
          data-testid="password-input"
          type="password"
          value={ password }
        />
      </label>
      <br />
      <button
        className="login-button"
        disabled={ buttonDisabled }
        data-testid="login-submit-btn"
        onClick={ saveEmail }
      >
        Enter
      </button>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
