import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

const EMAIL = 'email-input';
const PASSWORD = 'password-input';
const BUTTON = 'login-submit-btn';

describe('Testa a tela principal de receitas', () => {
  it('Testa se há 12 receitas ao carregar a página', async () => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(EMAIL);
    const passwordInput = screen.getByTestId(PASSWORD);
    const loginButton = screen.getByTestId(BUTTON);

    userEvent.type(emailInput, 'email@email.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginButton);
    act(() => {
      history.push('/meals');
    });

    await waitFor(() => {
      screen.getByText('Corba');
    }, {
      timeout: 5000,
    });

    const recipes = screen.getAllByRole('heading', { level: 1 });
    expect(recipes).toHaveLength(13);
  });
  it('Testa se há 12 receitas ao carregar a página', async () => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(EMAIL);
    const passwordInput = screen.getByTestId(PASSWORD);
    const loginButton = screen.getByTestId(BUTTON);

    userEvent.type(emailInput, 'email@email.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginButton);
    act(() => {
      history.push('/meals');
    });

    await waitFor(() => {
      screen.getByText('Corba');
    }, {
      timeout: 5000,
    });

    const btnDrink = screen.getByTestId('drinks-bottom-btn');

    act(() => {
      userEvent.click(btnDrink);
      history.push('/drinks');
    });

    await waitFor(() => {
      screen.getByText('GG');
    }, {
      timeout: 5000,
    });

    const recipes = screen.getByRole('heading', { level: 1, name: 'GG' });
    userEvent.click(recipes);

    const { pathname } = window.location;

    expect(pathname).toBe('/drinks/15997');
  });
});
