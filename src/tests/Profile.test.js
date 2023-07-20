import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

const EMAIL = 'email-input';
const PASSWORD = 'password-input';
const BUTTON = 'login-submit-btn';
const doneBtn = 'profile-done-btn';
const profileBtn = 'profile-top-btn';

describe('Testa o componente Profile', () => {
  it('Testa se ao clicar no botão de perfil é redirecionado para a rota correta', () => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(EMAIL);
    const passwordInput = screen.getByTestId(PASSWORD);
    const loginButton = screen.getByTestId(BUTTON);

    act(() => {
      userEvent.type(emailInput, 'eamil@email.com');
      userEvent.type(passwordInput, '12224567');
      userEvent.click(loginButton);
    });

    const profile = screen.getByTestId(profileBtn);
    act(() => {
      userEvent.click(profile);
    });

    const { pathname } = history.location;
    const mail = screen.getByTestId('profile-email');

    expect(mail).toBeInTheDocument();
    expect(pathname).toBe('/profile');
  });
  it('Testa se redireciona para a rota correta ao clicar no botão', () => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(EMAIL);
    const passwordInput = screen.getByTestId(PASSWORD);
    const loginButton = screen.getByTestId(BUTTON);

    act(() => {
      userEvent.type(emailInput, 'eaial@email.com');
      userEvent.type(passwordInput, '12224567');
      userEvent.click(loginButton);
    });

    const profile = screen.getByTestId(profileBtn);
    act(() => {
      userEvent.click(profile);
    });

    const doneRecipes = screen.getByTestId(doneBtn);

    act(() => {
      userEvent.click(doneRecipes);
    });

    const { pathname } = history.location;

    expect(pathname).toBe('/done-recipes');
  });
  it('Testa se redireciona para a rota correta ao clicar no botão', () => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(EMAIL);
    const passwordInput = screen.getByTestId(PASSWORD);
    const loginButton = screen.getByTestId(BUTTON);

    act(() => {
      userEvent.type(emailInput, 'eail@email.com');
      userEvent.type(passwordInput, '12224567');
      userEvent.click(loginButton);
    });

    const profile = screen.getByTestId('profile-top-btn');
    act(() => {
      userEvent.click(profile);
    });

    const favoriteRecipes = screen.getByTestId('profile-favorite-btn');

    act(() => {
      userEvent.click(favoriteRecipes);
    });

    const { pathname } = history.location;

    expect(pathname).toBe('/favorite-recipes');
  });
  it('Testa se redireciona para a rota correta ao clicar no botão de logout', () => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(EMAIL);
    const passwordInput = screen.getByTestId(PASSWORD);
    const loginButton = screen.getByTestId(BUTTON);

    act(() => {
      userEvent.type(emailInput, 'eail@email.com');
      userEvent.type(passwordInput, '12224567');
      userEvent.click(loginButton);
    });

    const profile = screen.getByTestId(profileBtn);
    act(() => {
      userEvent.click(profile);
    });

    const logout = screen.getByTestId('profile-logout-btn');

    act(() => {
      userEvent.click(logout);
    });

    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });
  it('Testa se redireciona para a rota correta ao clicar no botão de logout', () => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(EMAIL);
    const passwordInput = screen.getByTestId(PASSWORD);

    act(() => {
      userEvent.type(emailInput, '');
      userEvent.type(passwordInput, '12224567');
      history.push('/meals');
    });

    const profile = screen.getByTestId(profileBtn);
    act(() => {
      userEvent.click(profile);
    });

    const mail = screen.getByTestId('profile-email');

    expect(mail).toHaveTextContent('');
  });
});

// profile-top-btn
