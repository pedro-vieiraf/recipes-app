import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

const EMAIL = 'email-input';
const PASSWORD = 'password-input';
const BUTTON = 'login-submit-btn';

test('App', () => {
  renderWithRouter(<App />);
  const emailInput = screen.getByTestId(EMAIL);
  const passwordInput = screen.getByTestId(PASSWORD);
  const loginButton = screen.getByTestId(BUTTON);
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
});

it('Teste se o botão está desabilitado com um email inválido.', () => {
  renderWithRouter(
    <App />,
  );
  const loginButton = screen.getByTestId(BUTTON);
  expect(loginButton).toBeDisabled();
});

it('Teste', () => {
  renderWithRouter(
    <App />,
  );
  const emailInput = screen.getByTestId(EMAIL);
  const passwordInput = screen.getByTestId(PASSWORD);
  const loginButton = screen.getByTestId(BUTTON);
  userEvent.type(emailInput, 'email@email.com');
  userEvent.type(passwordInput, '1234567');
  expect(loginButton).toBeEnabled();
});
