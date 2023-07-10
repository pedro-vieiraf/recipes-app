import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom/cjs/react-router-dom.min';
import App from '../App';

const EMAIL = 'email-input';
const PASSWORD = 'password-input';
const BUTTON = 'login-submit-btn';

test('App', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const emailInput = screen.getByTestId(EMAIL);
  const passwordInput = screen.getByTestId(PASSWORD);
  const loginButton = screen.getByTestId(BUTTON);
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
});

// 2. Teste se o botão está desabilitado com um email inválido.
it('Teste se o botão está desabilitado com um email inválido.', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const emailInput = screen.getByTestId(EMAIL);
  const passwordInput = screen.getByTestId(PASSWORD);
  const loginButton = screen.getByTestId(BUTTON);
  expect(loginButton).toBeDisabled();
  expect(emailInput).toHaveValue('');
  expect(passwordInput).toHaveValue('');
});

it('Teste', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const emailInput = screen.getByTestId(EMAIL);
  const passwordInput = screen.getByTestId(PASSWORD);
  const loginButton = screen.getByTestId(BUTTON);
  userEvent.type(emailInput, 'email@email.com');
  userEvent.type(passwordInput, '1234567');
  expect(loginButton).toBeEnabled();
});
