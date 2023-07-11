import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

const EMAIL = 'email-input';
const PASSWORD = 'password-input';
const BUTTON = 'login-submit-btn';

test('Testa se o botão de procura é renderizado ao clicar no botão', () => {
  const { history } = renderWithRouter(
    <App />,
  );

  const emailInput = screen.getByTestId(EMAIL);
  const passwordInput = screen.getByTestId(PASSWORD);
  const loginButton = screen.getByTestId(BUTTON);

  userEvent.type(emailInput, 'emai@email.com');
  userEvent.type(passwordInput, '1234567');
  userEvent.click(loginButton);

  act(() => history.push('/meals'));

  const title = screen.getByText('Meals');
  const btn = screen.getByRole('button');
  userEvent.click(btn);

  const input = screen.getByTestId('search-input');
  expect(input).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  expect(input).toBeInTheDocument();

  userEvent.click(btn);
  expect(input).not.toBeInTheDocument();
});

test('Testa se é renderizado o titulo corretamente', () => {
  const { history } = renderWithRouter(
    <App />,
  );

  const emailInput = screen.getByTestId(EMAIL);
  const passwordInput = screen.getByTestId(PASSWORD);
  const loginButton = screen.getByTestId(BUTTON);
  userEvent.type(emailInput, 'eail@email.com');
  userEvent.type(passwordInput, '1234567');
  userEvent.click(loginButton);

  act(() => history.push('/done-recipes'));

  const title = screen.getByTestId('page-title');
  expect(title).toBeInTheDocument();
  expect(title).toHaveTextContent('Done Recipes');
});
test('Testa se é renderizado o titulo "Favorite Recipes" corretamente', () => {
  const { history } = renderWithRouter(
    <App />,
  );

  const emailInput = screen.getByTestId(EMAIL);
  const passwordInput = screen.getByTestId(PASSWORD);
  const loginButton = screen.getByTestId(BUTTON);
  userEvent.type(emailInput, 'email@email.com');
  userEvent.type(passwordInput, '1234567');
  userEvent.click(loginButton);

  act(() => history.push('/favorite-recipes'));

  const title = screen.getByText('Favorite Recipes');
  expect(title).toBeInTheDocument();
  expect(title).toHaveTextContent('Favorite Recipes');
});
test('Testa se é renderizado o titulo "drinks"', () => {
  const { history } = renderWithRouter(
    <App />,
  );

  const emailInput = screen.getByTestId(EMAIL);
  const passwordInput = screen.getByTestId(PASSWORD);
  const loginButton = screen.getByTestId(BUTTON);
  userEvent.type(emailInput, 'email@email.com');
  userEvent.type(passwordInput, '1234567');
  userEvent.click(loginButton);

  act(() => history.push('/drinks'));

  const title = screen.getByText('Drinks');
  expect(title).toBeInTheDocument();
  expect(title).toHaveTextContent('Drinks');
});
test('Testa se é renderizado o titulo "profile"', () => {
  const { history } = renderWithRouter(
    <App />,
  );

  const emailInput = screen.getByTestId(EMAIL);
  const passwordInput = screen.getByTestId(PASSWORD);
  const loginButton = screen.getByTestId(BUTTON);
  userEvent.type(emailInput, 'emil@email.com');
  userEvent.type(passwordInput, '1234567');
  userEvent.click(loginButton);

  act(() => history.push('/profile'));

  const title = screen.getByText('Profile');
  expect(title).toBeInTheDocument();
  expect(title).toHaveTextContent('Profile');
});
