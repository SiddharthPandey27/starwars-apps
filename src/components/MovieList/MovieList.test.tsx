import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieList from './MovieList';
import mockMovies from '../../__mocks__/mockMovies';

describe('MovieList Component', () => {
  it('renders the movie list correctly', () => {
    render(<MovieList movies={mockMovies} onMovieSelect={jest.fn()} selectedMovie={null} />);

    expect(screen.getByText(/Star Wars/)).toBeInTheDocument();
    expect(screen.getByText(/The Phantom Menace/)).toBeInTheDocument();
  });
});
