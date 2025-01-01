import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from '../App';
import moviesReducer, { MoviesState, Movie } from '../redux/moviesSlice';
import mockMovies from '../__mocks__/mockMovies';

describe('App Component', () => {
  const setupStore = (preloadedState: { movies: MoviesState }) => {
    return configureStore({
      reducer: {
        movies: moviesReducer,
      },
      preloadedState,
    });
  };

  it('renders App with movies and the filter input', () => {
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

    expect(screen.getByPlaceholderText(/Filter movies.../i)).toBeInTheDocument();
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

  it('allows selecting a movie and displays its details', () => {
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
  
    const movieRow = screen.getByText(/The Phantom Menace/i).closest('.movie-row');
    expect(movieRow).toBeInTheDocument();
  
    fireEvent.click(movieRow!);
  
    // Debugging output for the movie details section
    const directedByContainer = screen.getByText(/Directed by:/i).parentElement;
    expect(directedByContainer).toBeInTheDocument();
    expect(directedByContainer).toHaveTextContent('George Lucas 🎬');
  
    const producedByContainer = screen.getByText(/Produced by:/i).parentElement;
    expect(producedByContainer).toBeInTheDocument();
    expect(producedByContainer).toHaveTextContent('Rick McCallum 🎥');
  
    expect(screen.getByText(/Won 3 Oscars/i)).toBeInTheDocument();
  });

  it('displays the dropdown menu when Sort By is hovered and sorts movies', () => {
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

    const sortByButton = screen.getByText(/Sort By/i);
    fireEvent.mouseOver(sortByButton);

    const dropdownOption = screen.getByRole('button', { name: /Episode No./i });
    expect(dropdownOption).toBeInTheDocument();

    fireEvent.click(dropdownOption);

    expect(screen.getByText(/The Phantom Menace/i)).toBeInTheDocument();
  });

  it('filters movies based on input', () => {
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

    const filterInput = screen.getByPlaceholderText(/Filter movies.../i);
    fireEvent.change(filterInput, { target: { value: 'Phantom' } });

    expect(screen.getByText(/The Phantom Menace/i)).toBeInTheDocument();
    expect(screen.queryByText(/The Attack of the Clones/i)).not.toBeInTheDocument();
  });
});
