import React, { useContext } from 'react';
import LoginContext from './Context/Logincontext';

function Login() {
  const { email, password, handleChange, buttonDisabled } = useContext(LoginContext);

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
        <button
          disabled={ buttonDisabled }
          data-testid="login-submit-btn"
        >
          Enter
        </button>
      </label>
    </div>
  );
}

export default Login;
