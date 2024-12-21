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
        <p><strong>Rated:</strong> {movie.rated} 🎞️</p>
        <p><strong>Runtime:</strong> {movie.runtime} ⏳</p>
        <p><strong>Genre:</strong> {movie.genre} 🎭</p>
        <p><strong>Directed by:</strong> {movie.director} 🎬</p>
        <p><strong>Writer:</strong> {movie.writer} ✍️</p>
        <p><strong>Produced by:</strong> {movie.producer} 🎥</p>
        <p><strong>Awards:</strong> {movie.awards} 🏆</p>
        <p><strong>Release Date:</strong> {movie.release_date} 📅</p>
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
          ({movie.imdbVotes} votes)
        </p>
        <p><strong>Box Office:</strong> {movie.boxOffice} 💰</p>
        <div className="movie-details-ratings">
          <button onClick={() => window.open(`https://www.imdb.com/title/${movie.imdbID}`)}>
            IMDb: {movie.imdbRating} 🔗
          </button>
          <button>Rotten Tomatoes: {movie.rottenTomatoes}</button>
          <button>Metacritic: {movie.metacritic}</button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
