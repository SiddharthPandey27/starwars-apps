import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from '../App';
import moviesReducer, { Movie, MoviesState } from '../redux/moviesSlice';

const mockMovies: Movie[] = [
  {
    title: 'The Phantom Menace',
    episode_id: 1,
    opening_crawl: '',
    director: 'George Lucas',
    producer: 'Rick McCallum',
    release_date: '1999-05-19',
    description: '',
    image: '',
    rating: 4.5,
    imdbRating: '76%',
    rottenTomatoes: '79%',
    metacritic: '68%',
  },
  {
    title: 'Attack of the Clones',
    episode_id: 2,
    opening_crawl: '',
    director: 'George Lucas',
    producer: 'Rick McCallum',
    release_date: '2002-05-16',
    description: '',
    image: '',
    rating: 3.5,
    imdbRating: '72%',
    rottenTomatoes: '75%',
    metacritic: '60%',
  },
];

describe('App Component', () => {
  const setupStore = (preloadedState: { movies: MoviesState }) => {
    return configureStore({
      reducer: {
        movies: moviesReducer,
      },
      preloadedState,
    });
  };

  it('renders the App component', () => {
    const store = setupStore({
      movies: {
        movies: mockMovies,
        selectedMovie: null,
        loading: false,
        error: '',
      },
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText(/Filter movies/i)).toBeInTheDocument();
  });

  it('displays the movie list', () => {
    const store = setupStore({
      movies: {
        movies: mockMovies,
        selectedMovie: null,
        loading: false,
        error: '',
      },
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText(/The Phantom Menace/i)).toBeInTheDocument();
    expect(screen.getByText(/Attack of the Clones/i)).toBeInTheDocument();
  });

  it('filters the movie list based on input', () => {
    const store = setupStore({
      movies: {
        movies: mockMovies,
        selectedMovie: null,
        loading: false,
        error: '',
      },
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const filterInput = screen.getByPlaceholderText(/Filter movies/i);
    fireEvent.change(filterInput, { target: { value: 'Phantom' } });

    expect(screen.getByText(/The Phantom Menace/i)).toBeInTheDocument();
    expect(screen.queryByText(/Attack of the Clones/i)).toBeNull();
  });
});
