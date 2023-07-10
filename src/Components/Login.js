import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import LoginContext from './Context/Logincontext';

function Login(props) {
  const { email, password, handleChange, buttonDisabled } = useContext(LoginContext);

  function saveEmail() {
    const { history } = props;
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/header');
  }

  return (
    <div>
      <label htmlFor="">
        <input
          onChange={ handleChange }
          data-testid="email-input"
          type="email"
          name="email"
          value={ email }
        />
        <input
          onChange={ handleChange }
          name="password"
          data-testid="password-input"
          type="password"
          value={ password }
        />
        <br />
        <button
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
