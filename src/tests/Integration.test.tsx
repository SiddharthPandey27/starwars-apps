import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { Provider } from 'react-redux';
import store from '../redux/store';
import mockMovies from '../__mocks__/mockMovies';

describe('App Integration Test', () => {
  it('fetches movies and displays them', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Wait for movies to load
    expect(await screen.findByText(/The Phantom Menace/)).toBeInTheDocument();
  });

  it('displays movie details when a movie is selected', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const movieRow = await screen.findByText(/The Phantom Menace/);
    movieRow.click();

    expect(await screen.findByText(/Directed by:/)).toBeInTheDocument();
    expect(screen.getByText(/George Lucas/)).toBeInTheDocument();
  });
});
