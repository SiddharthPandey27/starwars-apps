import React from 'react';
import { Movie } from '../../redux/moviesSlice'; // Import the Movie type
import './MovieList.css';

interface MovieListProps {
  movies: Movie[];
  onMovieSelect: (movie: Movie) => void;
  selectedMovie: Movie | null;
}

const MovieList: React.FC<MovieListProps> = ({ movies, onMovieSelect, selectedMovie }) => {
  return (
    <div className="movie-list">
      {movies.map((movie, index) => (
        <div
          key={movie.episode_id}
          className={`movie-row ${selectedMovie?.episode_id === movie.episode_id ? 'selected' : ''}`}
          onClick={() => onMovieSelect(movie)}
        >
          <div className="movie-index">{index + 1}.</div>
          <div className="movie-details-wrapper">
            <div className="movie-poster-title">
              <img src={movie.image} alt={movie.title} className="movie-poster" />
              <div className="movie-title-wrapper">
                <div className="star-wars-text">Star Wars</div>
                <div className="movie-title">
                  Episode {movie.episode_id} - {movie.title}
                </div>
              </div>
            </div>
            <div className="movie-info">
              <div className="movie-rating">
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
              </div>
              <div className="movie-release-date">
                {window.innerWidth <= 768 ? 'Release Date - ' : null}
                {new Date(movie.release_date).toISOString().split('T')[0].replace(/-/g, '/')}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
