import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login';

function App() {
  return (
    <div>
      <Route exact path="/" component={ Login } />
    </div>
  );
}

export default App;
