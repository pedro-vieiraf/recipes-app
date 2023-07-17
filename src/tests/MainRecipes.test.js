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

    act(() => {
      userEvent.type(emailInput, 'emai@email.com');
      userEvent.type(passwordInput, '1234567');
      userEvent.click(loginButton);
      history.push('/meals');
    });

    await waitFor(() => {
      screen.getByTestId('0-recipe-card');
    }, {
      timeout: 4000,
    });

    const recipes = screen.getAllByRole('heading', { level: 1 });
    expect(recipes).toHaveLength(13);
  });

  it('Testa se há 12 receitas de bebidas ao carregar a página', async () => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(EMAIL);
    const passwordInput = screen.getByTestId(PASSWORD);
    const loginButton = screen.getByTestId(BUTTON);

    act(() => {
      userEvent.type(emailInput, 'email@email.com');
      userEvent.type(passwordInput, '1234567');
      userEvent.click(loginButton);
      history.push('/meals');
    });

    await waitFor(() => {
      screen.getByTestId('0-card-name');
    }, {
      timeout: 4000,
    });

    const btnDrink = screen.getByTestId('drinks-bottom-btn');

    act(() => {
      userEvent.click(btnDrink);
      history.push('/drinks');
    });

    await waitFor(() => {
      screen.getByTestId('0-recipe-card');
    }, {
      timeout: 4000,
    });

    // const { pathname } = window.location;
    const recipes = screen.getAllByRole('heading', { level: 1 });

    expect(recipes).toHaveLength(13);
    // expect(pathname).toBe('/drinks');
  });
  it('Testa se há os botoes de filtro ao carregar a página', async () => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(EMAIL);
    const passwordInput = screen.getByTestId(PASSWORD);
    const loginButton = screen.getByTestId(BUTTON);

    act(() => {
      userEvent.type(emailInput, 'emai@email.com');
      userEvent.type(passwordInput, '1234567');
      userEvent.click(loginButton);
      history.push('/meals');
    });

    await waitFor(() => {
      screen.getByTestId('0-card-name');
    }, {
      timeout: 4000,
    });

    const recipes = screen.getByRole('heading', { level: 1, name: 'Corba' });
    act(() => {
      userEvent.click(recipes);
      history.push('/meals/52977');
    });

    await waitFor(() => {
      screen.getByText('Corba');
    }, {
      timeout: 4000,
    });

    const photo = screen.getByTestId('recipe-photo');

    expect(photo).toBeInTheDocument();
  });
});
