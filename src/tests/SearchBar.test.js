import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('should elements be on SearchBar', () => {
  test('1) test SerachBar for meals', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/meals');
    });

    const searchIconButton = screen.getByTestId('search-top-btn');
    userEvent.click(searchIconButton);
    const inputSearch = screen.getByTestId('search-input');
    const radioIngredient = screen.getByTestId('ingredient-search-radio');
    const radioName = screen.getByTestId('name-search-radio');
    const radioFirstLetter = screen.getByTestId('first-letter-search-radio');
    const searchButton = screen.getByTestId('exec-search-btn');
    expect(inputSearch).toBeInTheDocument();
    expect(radioIngredient).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();
    expect(radioFirstLetter).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();

    userEvent.type(inputSearch, 'potato');
    userEvent.click(radioIngredient);
    userEvent.click(searchButton);
  });
  test('2) test SerachBar for drinks', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/drinks');
    });
    const searchIconButton = screen.getByTestId('search-top-btn');
    userEvent.click(searchIconButton);
    const inputSearch = screen.getByTestId('search-input');
    const radioName = screen.getByTestId('name-search-radio');
    const radioFirstLetter = screen.getByTestId('first-letter-search-radio');
    const searchButton = screen.getByTestId('exec-search-btn');

    jest.spyOn(global, 'alert').mockImplementation(() => {});

    userEvent.type(inputSearch, 'wine');
    userEvent.click(radioFirstLetter);
    userEvent.click(searchButton);

    expect(radioFirstLetter.checked).toEqual(true);
    expect(global.alert).toHaveBeenCalled();

    userEvent.clear(inputSearch);
    userEvent.type(inputSearch, 'wine');
    userEvent.click(radioName);
    userEvent.click(searchButton);
  });
});
