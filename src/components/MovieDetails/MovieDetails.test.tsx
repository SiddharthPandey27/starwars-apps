import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieDetails from './MovieDetails';
import { Movie } from '../../redux/moviesSlice';

const mockMovie: Movie = {
  title: 'The Phantom Menace',
  episode_id: 1,
  opening_crawl: 'A long time ago in a galaxy far, far away...',
  director: 'George Lucas',
  producer: 'Rick McCallum',
  release_date: '1999-05-19',
  description: 'A conflict arises...',
  image: 'path/to/image.jpg',
  rating: 4.5,
  imdbRating: '76%',
  rottenTomatoes: '79%',
  metacritic: '68%',
};

describe('MovieDetails Component', () => {
  it('renders the movie details correctly', () => {
    render(<MovieDetails movie={mockMovie} />);
    expect(screen.getByText(/The Phantom Menace/i)).toBeInTheDocument();
    expect(screen.getByText(/Episode 1/i)).toBeInTheDocument();
    expect(screen.getByText(/George Lucas/i)).toBeInTheDocument();
    expect(screen.getByText(/Rick McCallum/i)).toBeInTheDocument();
    expect(screen.getByText(/1999\/05\/19/i)).toBeInTheDocument(); // Format YYYY/MM/DD
    expect(screen.getByText(/A conflict arises.../i)).toBeInTheDocument();
  });

  it('renders ratings correctly', () => {
    render(<MovieDetails movie={mockMovie} />);
    expect(screen.getByText(/IMDb: 76%/i)).toBeInTheDocument();
    expect(screen.getByText(/Rotten Tomatoes: 79%/i)).toBeInTheDocument();
    expect(screen.getByText(/Metacritic: 68%/i)).toBeInTheDocument();
  });

  it('renders the poster image with alt text', () => {
    render(<MovieDetails movie={mockMovie} />);
    const posterImage = screen.getByAltText(/The Phantom Menace poster/i);
    expect(posterImage).toBeInTheDocument();
    expect(posterImage).toHaveAttribute('src', 'path/to/image.jpg');
  });

  it('shows no content if no movie is selected', () => {
    render(<MovieDetails movie={null as unknown as Movie} />);
    expect(screen.getByText(/Select a movie to view details/i)).toBeInTheDocument();
  });
});
