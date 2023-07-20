import React from 'react';
import { screen } from '@testing-library/react';
import Footer from '../Components/Footer/Footer';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Footer', () => {
  it('Verifica se o componente Footer está sendo renderizado corretamente.', () => {
    renderWithRouter(<Footer />);

    const footerElement = screen.getByTestId('footer');
    expect(footerElement).toBeInTheDocument();
  });

  it('Verifica se o botão de drinks está presente no Footer.', () => {
    renderWithRouter(<Footer />);

    const drinksButton = screen.getByTestId('drinks-bottom-btn');
    expect(drinksButton).toBeInTheDocument();
  });

  it('Verifica se o botão de meals está presente no Footer', () => {
    renderWithRouter(<Footer />);

    const mealsButton = screen.getByTestId('meals-bottom-btn');
    expect(mealsButton).toBeInTheDocument();
  });

  it('Verifica se o redirecionamento para a página de drinks ocorre quando o botão de drinks é clicado.', () => {
    renderWithRouter(<Footer />);

    const drinksButton = screen.getByTestId('drinks-bottom-btn');
    drinksButton.click();

    expect(window.location.pathname).toBe('/drinks');
  });

  it('Verifica se o redirecionamento para a página de meals ocorre quando o botão de meals é clicado.', () => {
    renderWithRouter(<Footer />);

    const mealsButton = screen.getByTestId('meals-bottom-btn');
    mealsButton.click();

    expect(window.location.pathname).toBe('/meals');
  });
});
