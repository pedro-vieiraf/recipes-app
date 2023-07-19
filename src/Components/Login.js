import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import LoginContext from './Context/Logincontext';
// import '../style/Login.css';

function Login() {
  const { email, password, handleChange, buttonDisabled } = useContext(LoginContext);
  const history = useHistory();

  function saveEmail() {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  }

  return (
    <div className="login-container">
      <h1 className="app-title">app de receitas</h1>
      {/* <h3 className="app-subtitle">receitas do chefe</h3> */}
      <label htmlFor="">
        <input
          className="email-input"
          placeholder="Insira seu e-mail"
          onChange={ handleChange }
          data-testid="email-input"
          type="email"
          name="email"
          value={ email }
        />
        <input
          className="input-password"
          placeholder="Insira sua senha"
          onChange={ handleChange }
          name="password"
          data-testid="password-input"
          type="password"
          value={ password }
        />
        <br />
        <button
          className="submit-button"
          disabled={ buttonDisabled }
          data-testid="login-submit-btn"
          onClick={ saveEmail }
        >
          Enter
        </button>
      </label>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
