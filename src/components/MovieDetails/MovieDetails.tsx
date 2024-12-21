import React from 'react';
import './MovieDetails.css';
import { Movie } from '../../redux/moviesSlice';

interface MovieDetailsProps {
  movie: Movie | null;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => {
  if (!movie) {
    return <div className="movie-details-placeholder">Select a movie to view details.</div>;
  }

  return (
    <div className="movie-details-container">
      <div className="movie-details-header">
        <img src={movie.image} alt={movie.title} className="movie-details-poster" />
        <div className="movie-details-info">
          <h2>{movie.title}</h2>
          <p><strong>Description:</strong> {movie.description}</p>
        </div>
      </div>
      <div className="movie-details-footer">
        <p><strong>Directed by:</strong> {movie.director}</p>
        <p><strong>Produced by:</strong> {movie.producer}</p>
        <p><strong>Release Date:</strong> {movie.release_date}</p>
        <p><strong>Average Rating: </strong>
          {Array.from({ length: 10 }, (_, i) => (
            <span
              key={i}
              className={`star ${i < Math.floor(movie.rating) ? 'filled' : ''} ${
                i === Math.floor(movie.rating) && movie.rating % 1 > 0 ? 'half-filled' : ''
              }`}
            >
              ★
            </span>
          ))}
        </p>
        <div className="movie-details-ratings">
          <button>IMDb: {movie.imdbRating}</button>
          <button>Rotten Tomatoes: {movie.rottenTomatoes}</button>
          <button>Metacritic: {movie.metacritic}</button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
