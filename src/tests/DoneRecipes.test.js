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

describe('Testa a página de Receitas Feitas', () => {
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

    const profileIcon = screen.getByTestId('profile-top-btn');

    expect(profileIcon).toBeInTheDocument();

    act(() => {
      userEvent.click(screen.getByTestId(profileBtn));
    });

    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });
});
