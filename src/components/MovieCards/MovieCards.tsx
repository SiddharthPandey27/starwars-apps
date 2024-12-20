import React from 'react';
import { Movie } from '../../redux/moviesSlice';
import './MovieCards.css';

interface MovieCardsProps {
  movies: Movie[];
  onMovieSelect: (movie: Movie) => void;
}

const MovieCards: React.FC<MovieCardsProps> = ({ movies, onMovieSelect }) => {
  return (
    <div className="movie-cards">
      {movies.map((movie) => (
        <div
          key={movie.episode_id}
          className="movie-card"
          onClick={() => onMovieSelect(movie)}
        >
          <img src={movie.image} alt={movie.title} className="movie-card-poster" />
          <div className="movie-card-info">
            <h4 className="movie-card-title">
              Episode {movie.episode_id}:<br /> {movie.title}
            </h4>
            <p className="movie-card-release">
              Release Date: {new Date(movie.release_date).toISOString().split('T')[0].replace(/-/g, '/')}
            </p>
            <p className="movie-card-rating">
              Rating: <span className="rating-stars">{movie.rating.toFixed(1)} ★</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieCards;
