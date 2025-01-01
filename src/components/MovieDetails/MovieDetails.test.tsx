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

    const descriptionElement = screen.getByText(/Description:/i).parentElement;
    expect(descriptionElement).toHaveTextContent(mockMovie.description);

    const ratedElement = screen.getByText(/Rated:/i).parentElement;
    expect(ratedElement).toHaveTextContent(mockMovie.rated);

    const runtimeElement = screen.getByText(/Runtime:/i).parentElement;
    expect(runtimeElement).toHaveTextContent(mockMovie.runtime);

    const genreElement = screen.getByText(/Genre:/i).parentElement;
    expect(genreElement).toHaveTextContent(mockMovie.genre);

    const directedByElement = screen.getByText(/Directed by:/i).parentElement;
    expect(directedByElement).toHaveTextContent(mockMovie.director);

    const writerElement = screen.getByText(/Writer:/i).parentElement;
    expect(writerElement).toHaveTextContent(mockMovie.writer);

    const producedByElement = screen.getByText(/Produced by:/i).parentElement;
    expect(producedByElement).toHaveTextContent(mockMovie.producer);

    const awardsElement = screen.getByText(/Awards:/i).parentElement;
    expect(awardsElement).toHaveTextContent(mockMovie.awards);

    const releaseDateElement = screen.getByText(/Release Date:/i).parentElement;
    expect(releaseDateElement).toHaveTextContent(mockMovie.release_date);

    const boxOfficeElement = screen.getByText(/Box Office:/i).parentElement;
    expect(boxOfficeElement).toHaveTextContent(mockMovie.boxOffice);

    const imdbVotesElement = screen.getByText(/Average Rating:/i).parentElement;
    expect(imdbVotesElement).toHaveTextContent(`${mockMovie.imdbVotes} votes`);

    const imdbRatingElement = screen.getByText(/IMDb:/i).parentElement;
    expect(imdbRatingElement).toHaveTextContent(mockMovie.imdbRating);

    const rottenTomatoesElement = screen.getByText(/Rotten Tomatoes:/i).parentElement;
    expect(rottenTomatoesElement).toHaveTextContent(mockMovie.rottenTomatoes);

    const metacriticElement = screen.getByText(/Metacritic:/i).parentElement;
    expect(metacriticElement).toHaveTextContent(mockMovie.metacritic);
  });

  it('renders IMDb link button correctly', () => {
    render(<MovieDetails movie={mockMovie} />);
    const imdbButton = screen.getByText(/IMDb:/i).closest('button');
    expect(imdbButton).toBeInTheDocument();
    expect(imdbButton).toHaveTextContent(mockMovie.imdbRating);
  });
});
