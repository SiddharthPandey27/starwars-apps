import React, { act } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from '../App';
import mockMovies from '../__mocks__/mockMovies';

const mockReducer = (state = { movies: [], selectedMovie: null }, action: any) => {
  switch (action.type) {
    case 'movies/fetchMovies':
      return { ...state, movies: action.payload };
    case 'movies/selectMovie':
      return { ...state, selectedMovie: action.payload };
    default:
      return state;
  }
};

const createMockStore = (preloadedState: any) =>
  configureStore({
    reducer: {
      movies: mockReducer,
    },
    preloadedState,
  } as any);

describe('Integration Test', () => {
  let store: ReturnType<typeof createMockStore>;

  beforeEach(() => {
    store = createMockStore({
      movies: {
        movies: mockMovies,
        selectedMovie: null,
      },
    });
  });

  it('fetches movies and displays them', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const movieTitle = await screen.findByText(/The Phantom Menace/);
    expect(movieTitle).toBeInTheDocument();
  });

  it('displays movie details when a movie is selected', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const movieTitle = await screen.findByText(/The Phantom Menace/);
    fireEvent.click(movieTitle);
    
    await act(async () => {
      store.dispatch({
        type: 'movies/selectMovie',
        payload: {
          title: 'The Phantom Menace',
          director: 'George Lucas',
        },
      });
    });
  
    await waitFor(() => {
      expect(screen.getByText(/Directed by:/)).toBeInTheDocument();
      expect(screen.getByText(/George Lucas/)).toBeInTheDocument();
    });
  });
});
