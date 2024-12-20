import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import MovieList from './MovieList';
import moviesReducer, { MoviesState } from '../../redux/moviesSlice';

// Mock movie data
const mockMovies = [
  {
    title: 'The Phantom Menace',
    episode_id: 1,
    opening_crawl: '',
    director: '',
    producer: '',
    release_date: '1999-05-19',
    description: '',
    image: '',
    rating: 4.5,
    imdbRating: '76%',
    rottenTomatoes: '79%',
    metacritic: '68%',
  },
];

describe('MovieList Component', () => {
  const setupStore = (preloadedState: { movies: MoviesState }) => {
    return configureStore({
      reducer: {
        movies: moviesReducer,
      },
      preloadedState,
    });
  };

  it('renders the movie list correctly', () => {
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
        <MovieList movies={mockMovies} onMovieSelect={jest.fn()} selectedMovie={null} />
      </Provider>
    );

    expect(screen.getByText(/The Phantom Menace/i)).toBeInTheDocument();
  });

  it('renders no movies message when movie list is empty', () => {
    const store = setupStore({
      movies: {
        movies: [],
        selectedMovie: null,
        loading: false,
        error: '',
      },
    });

    render(
      <Provider store={store}>
        <MovieList movies={[]} onMovieSelect={jest.fn()} selectedMovie={null} />
      </Provider>
    );

    expect(screen.getByText(/No movies available/i)).toBeInTheDocument();
  });
});
