import React, { useState, useMemo } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login';
import LoginContext from './Components/Context/Logincontext';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);

  console.log(buttonDisabled);

  const buttonStatus = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordLength = 6;
    if (emailRegex.test(email) && password.length >= passwordLength) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  function handleChange({ target }) {
    const { name, value } = target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    buttonStatus();
  }

  const context = useMemo(() => ({
    email,
    password,
    handleChange,
    buttonDisabled,
    buttonStatus,
  }), [email, password]);

  return (
    <LoginContext.Provider
      value={ context }
    >
      <Route exact path="/" component={ Login } />
    </LoginContext.Provider>
  );
}

export default App;
