import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieDetails from './MovieDetails';
import { Movie } from '../../redux/moviesSlice';
import mockMovies from '../../__mocks__/mockMovies';

const mockMovie: Movie = mockMovies[0];

describe('MovieDetails Component', () => {
  it('renders the movie details correctly', () => {
    render(<MovieDetails movie={mockMovie} />);

    expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
    expect(screen.getByText(`Description: ${mockMovie.description}`)).toBeInTheDocument();
    expect(screen.getByText(`Rated: ${mockMovie.rated}`)).toBeInTheDocument();
    expect(screen.getByText(`Runtime: ${mockMovie.runtime}`)).toBeInTheDocument();
    expect(screen.getByText(`Genre: ${mockMovie.genre}`)).toBeInTheDocument();
    expect(screen.getByText(`Directed by: ${mockMovie.director}`)).toBeInTheDocument();
    expect(screen.getByText(`Writer: ${mockMovie.writer}`)).toBeInTheDocument();
    expect(screen.getByText(`Produced by: ${mockMovie.producer}`)).toBeInTheDocument();
    expect(screen.getByText(`Awards: ${mockMovie.awards}`)).toBeInTheDocument();
    expect(screen.getByText(`Release Date: ${mockMovie.release_date}`)).toBeInTheDocument();
    expect(screen.getByText(`Box Office: ${mockMovie.boxOffice}`)).toBeInTheDocument();
    expect(screen.getByText(`IMDb: ${mockMovie.imdbRating}`)).toBeInTheDocument();
    expect(screen.getByText(`Rotten Tomatoes: ${mockMovie.rottenTomatoes}`)).toBeInTheDocument();
    expect(screen.getByText(`Metacritic: ${mockMovie.metacritic}`)).toBeInTheDocument();
  });

  it('renders IMDb link button correctly', () => {
    render(<MovieDetails movie={mockMovie} />);
    const imdbButton = screen.getByText(`IMDb: ${mockMovie.imdbRating}`);
    expect(imdbButton.closest('button')).toBeInTheDocument();
  });
});
