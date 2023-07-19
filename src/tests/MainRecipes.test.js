import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

const EMAIL = 'email-input';
const PASSWORD = 'password-input';
const BUTTON = 'login-submit-btn';
const recipeCard = '0-recipe-card';

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
    });

    await waitFor(() => {
      screen.getByTestId(recipeCard);
    }, {
      timeout: 4000,
    });

    const recipes = screen.getAllByRole('heading', { level: 1 });
    const { pathname } = history.location;
    expect(recipes).toHaveLength(13);
    expect(pathname).toBe('/meals');
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
    });

    await waitFor(() => {
      screen.getByTestId(recipeCard);
    }, {
      timeout: 4000,
    });

    const btnCategory = screen.getByTestId('drinks-bottom-btn');

    act(() => {
      userEvent.click(btnCategory);
    });

    await waitFor(() => {
      screen.getByTestId(recipeCard);
    }, {
      timeout: 4000,
    });

    const recipes = screen.getAllByRole('heading', { level: 1 });
    const { pathname } = history.location;

    expect(recipes).toHaveLength(13);
    expect(pathname).toBe('/drinks');
  });

  it('Testa se há os botoes de filtro a carregar a página', async () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(EMAIL);
    const passwordInput = screen.getByTestId(PASSWORD);
    const loginButton = screen.getByTestId(BUTTON);

    act(() => {
      userEvent.type(emailInput, 'email@email.com');
      userEvent.type(passwordInput, '1234567');
      userEvent.click(loginButton);
    });

    await waitFor(() => {
      screen.getByTestId(recipeCard);
    }, {
      timeout: 4000,
    });

    const btnCategory = screen.getByTestId('Breakfast-category-filter');

    act(() => {
      userEvent.click(btnCategory);
    });

    await waitFor(() => {
      screen.getByTestId(recipeCard);
    }, {
      timeout: 4000,
    });

    const recipe = screen.getByTestId(recipeCard);

    expect(recipe).toBeInTheDocument();
  });
  it('Testa se há os botoes de filtro ao carregar a página', async () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(EMAIL);
    const passwordInput = screen.getByTestId(PASSWORD);
    const loginButton = screen.getByTestId(BUTTON);

    act(() => {
      userEvent.type(emailInput, 'emil@email.com');
      userEvent.type(passwordInput, '1234567');
      userEvent.click(loginButton);
    });

    await waitFor(() => {
      screen.getByTestId('0-card-name');
    }, {
      timeout: 4000,
    });

    const searchButton = screen.getByTestId('search-top-btn');

    act(() => {
      userEvent.click(searchButton);
    });

    await waitFor(() => {
      screen.getByTestId('search-input');
    }, {
      timeout: 4000,
    });

    const inputSearch = screen.getByTestId('search-input');
    const radioBtn = screen.getByTestId('ingredient-search-radio');
    const search = screen.getByTestId('exec-search-btn');

    act(() => {
      userEvent.type(inputSearch, 'chicken');
      userEvent.click(radioBtn);
      userEvent.click(search);
    });

    await waitFor(() => {
      screen.getByTestId(recipeCard);
    }, {
      timeout: 4000,
    });

    const recipe = screen.getByTestId(recipeCard);
    const recipes = screen.getAllByRole('heading', { level: 2 });

    expect(recipe).toBeInTheDocument();
    expect(recipes).toHaveLength(12);
  });
  it('Testa se há os botoes de filtro ao carregar a página', async () => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(EMAIL);
    const passwordInput = screen.getByTestId(PASSWORD);
    const loginButton = screen.getByTestId(BUTTON);

    act(() => {
      userEvent.type(emailInput, 'eail@email.com');
      userEvent.type(passwordInput, '12224567');
      userEvent.click(loginButton);
    });

    await waitFor(() => {
      screen.getByTestId(recipeCard);
    }, {
      timeout: 4000,
    });

    const btnCategory = screen.getByTestId('0-card-img');

    act(() => {
      userEvent.click(btnCategory);
    });

    const { pathname } = history.location;

    expect(pathname).toBe('/meals/52977');
  });
});
