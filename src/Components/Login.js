import React from 'react';

function Login() {
  return (
    <div>
      <label htmlFor="">
        <input
          data-testid="email-input"
          type="email"
        />
        <input
          data-testid="password-input"
          type="password"
        />
      </label>
      <button
        data-testid="login-submit-btn"
      >
        Enter
      </button>
    </div>
  );
}

export default Login;
