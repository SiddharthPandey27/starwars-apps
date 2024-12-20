import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MovieCards from './MovieCards';
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
    image: 'path/to/image.jpg',
    rating: 4.5,
    imdbRating: '76%',
    rottenTomatoes: '79%',
    metacritic: '68%',
  },
];

describe('MovieCards Component', () => {
  const mockOnMovieSelect = jest.fn();

  it('renders the cards correctly', () => {
    render(<MovieCards movies={mockMovies} onMovieSelect={mockOnMovieSelect} />);
    expect(screen.getByText(/The Phantom Menace/i)).toBeInTheDocument();
    expect(screen.getByText(/Episode 1/i)).toBeInTheDocument();
    expect(screen.getByText(/1999\/05\/19/i)).toBeInTheDocument(); // Format YYYY/MM/DD
    expect(screen.getByText(/4.5/i)).toBeInTheDocument(); // Rating
  });

  it('renders the poster image in each card', () => {
    render(<MovieCards movies={mockMovies} onMovieSelect={mockOnMovieSelect} />);
    const posterImage = screen.getByAltText(/The Phantom Menace poster/i);
    expect(posterImage).toBeInTheDocument();
    expect(posterImage).toHaveAttribute('src', 'path/to/image.jpg');
  });

  it('calls onMovieSelect when a card is clicked', () => {
    render(<MovieCards movies={mockMovies} onMovieSelect={mockOnMovieSelect} />);
    const movieCard = screen.getByText(/The Phantom Menace/i).closest('.movie-card');
    fireEvent.click(movieCard!);
    expect(mockOnMovieSelect).toHaveBeenCalledWith(mockMovies[0]);
  });

  it('renders an empty message when no movies are provided', () => {
    render(<MovieCards movies={[]} onMovieSelect={mockOnMovieSelect} />);
    expect(screen.getByText(/No movies available/i)).toBeInTheDocument();
  });
});
