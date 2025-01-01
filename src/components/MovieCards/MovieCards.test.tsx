import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MovieCards from './MovieCards';
import mockMovies from '../../__mocks__/mockMovies';

describe('MovieCards Component', () => {
  const mockOnMovieSelect = jest.fn();

  it('renders the cards correctly', () => {
    render(<MovieCards movies={mockMovies} onMovieSelect={mockOnMovieSelect} />);
    expect(screen.getByText(/The Phantom Menace/i)).toBeInTheDocument();
    expect(screen.getByText(/Episode 1/i)).toBeInTheDocument();
  });

  it('renders the poster image for each card', () => {
    render(<MovieCards movies={mockMovies} onMovieSelect={mockOnMovieSelect} />);

    const posterImage = screen.getByAltText(/The Phantom Menace/i);
    expect(posterImage).toBeInTheDocument();
    expect(posterImage).toHaveAttribute('src', mockMovies[0].image);
  });

  it('calls onMovieSelect when a card is clicked', () => {
    render(<MovieCards movies={mockMovies} onMovieSelect={mockOnMovieSelect} />);

    const movieCard = screen.getByText(/The Phantom Menace/i).closest('.movie-card');
    fireEvent.click(movieCard!);

    expect(mockOnMovieSelect).toHaveBeenCalledWith(mockMovies[0]);
  });

  it('renders an empty state when no movies are provided', () => {
    render(<MovieCards movies={[]} onMovieSelect={mockOnMovieSelect} />);

    const emptyStateMessage = screen.getByText(/No movies available/i);
    expect(emptyStateMessage).toBeInTheDocument();
  });
});
