import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MovieList from './MovieList';
import { Movie } from '../../redux/moviesSlice';

const mockMovies: Movie[] = [
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
  {
    title: 'Attack of the Clones',
    episode_id: 2,
    opening_crawl: '',
    director: '',
    producer: '',
    release_date: '2002-05-16',
    description: '',
    image: '',
    rating: 3.5,
    imdbRating: '72%',
    rottenTomatoes: '75%',
    metacritic: '60%',
  },
];

describe('MovieList Component', () => {
  const mockOnMovieSelect = jest.fn();

  it('renders the list of movies correctly', () => {
    render(<MovieList movies={mockMovies} onMovieSelect={mockOnMovieSelect} selectedMovie={null} />);
    const movieTitles = screen.getAllByText(/Episode/i);
    expect(movieTitles).toHaveLength(mockMovies.length);
  });

  it('highlights the selected movie', () => {
    render(
      <MovieList
        movies={mockMovies}
        onMovieSelect={mockOnMovieSelect}
        selectedMovie={mockMovies[0]}
      />
    );
    const highlightedRow = screen.getByText(/The Phantom Menace/i).closest('.movie-row');
    expect(highlightedRow).toHaveClass('selected');
  });

  it('calls onMovieSelect when a movie is clicked', () => {
    render(
      <MovieList
        movies={mockMovies}
        onMovieSelect={mockOnMovieSelect}
        selectedMovie={null}
      />
    );
    const movieRow = screen.getByText(/The Phantom Menace/i).closest('.movie-row');
    fireEvent.click(movieRow!);
    expect(mockOnMovieSelect).toHaveBeenCalledWith(mockMovies[0]);
  });
});
