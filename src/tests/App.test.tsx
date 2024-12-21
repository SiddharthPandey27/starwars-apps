import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from '../App';
import moviesReducer, { MoviesState, Movie } from '../redux/moviesSlice';

const mockMovies: Movie[] = [
  {
    title: 'The Phantom Menace',
    episode_id: 1,
    opening_crawl: '',
    director: '',
    producer: '',
    release_date: '1999-05-19',
    description: '',
    image: 'path/to/image.jpg',
    rating: 4.5,
    imdbRating: '76%',
    rottenTomatoes: '79%',
    metacritic: '68%',
    plot: 'A long time ago...',
    actors: 'Liam Neeson, Ewan McGregor',
    awards: 'Won 3 Oscars',
    language: 'English',
    runtime: '136 min',
    genre: 'Action, Sci-Fi',
    rated: 'PG',
    writer: 'George Lucas',
    imdbVotes: '1,200,000',
    boxOffice: '$400,000,000',
    imdbID: 'tt0120915',
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

  it('renders App with movies', () => {
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
    expect(screen.getByText(/The Phantom Menace/i)).toBeInTheDocument();
  });

  it('shows no movie selected initially', () => {
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
        <App />
      </Provider>
    );

    expect(screen.getByText(/Select a movie to view details/i)).toBeInTheDocument();
  });
});
