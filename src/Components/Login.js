import React, { useContext } from 'react';
import LoginContext from './Context/Logincontext';

function Login() {
  const { email, password, handleChange, buttonDisabled } = useContext(LoginContext);

  function saveEmail() {
    localStorage.setItem('user', JSON.stringify({ email }));
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

export default Login;
