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

describe('Testa o componente RecipeInProgress', () => {
  it('Testa se há o botão de continuar para a receita', async () => {
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

    const btn = screen.getByTestId('start-recipe-btn');

    act(() => {
      userEvent.click(btn);
    });

    await waitFor(() => {
      screen.getByTestId('0-ingredient-step');
    }, {
      timeout: 4000,
    });

    const recipeCategory = screen.getByTestId('recipe-category');
    const instructions = screen.getByTestId('instructions');
    const recipeTitle = screen.getAllByTestId('recipe-title');
    const recipeStep = screen.getAllByTestId('ingredient-step');
    const recipePhoto = screen.getByTestId('recipe-photo');

    expect(recipePhoto).toBeInTheDocument();
    expect(recipeTitle).toHaveLength(2);
    expect(recipeStep).toHaveLength(13);
    expect(recipeCategory).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    const { pathname } = history.location;

    expect(pathname).toBe('/meals/52977/in-progress');

    const recipeTtl = screen.getByText('Corba');
    expect(recipeTtl).toBeInTheDocument();
  });

  it('Testa se há o botão de continuar para a receita drinks', async () => {
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

    const btnDrink = screen.getByTestId('drinks-bottom-btn');

    act(() => {
      userEvent.click(btnDrink);
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

    const btn = screen.getByTestId('start-recipe-btn');

    act(() => {
      userEvent.click(btn);
    });

    await waitFor(() => {
      screen.getByTestId('0-ingredient-step');
    }, {
      timeout: 4000,
    });

    const recipeCategory = screen.getByTestId('recipe-category');
    const instructions = screen.getByTestId('instructions');
    const recipeTitle = screen.getAllByTestId('recipe-title');
    const recipeStep = screen.getAllByTestId('ingredient-step');
    const recipePhoto = screen.getByTestId('recipe-photo');

    expect(recipePhoto).toBeInTheDocument();
    expect(recipeTitle).toHaveLength(2);
    expect(recipeStep).toHaveLength(3);
    expect(recipeCategory).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    const { pathname } = history.location;

    expect(pathname).toBe('/drinks/15997/in-progress');

    const recipeTtl = screen.getByText('GG');
    expect(recipeTtl).toBeInTheDocument();
  });
});
