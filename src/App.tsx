import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies, setSelectedMovie, Movie } from './redux/moviesSlice';
import { AppDispatch } from './redux/store';
import MovieList from './components/MovieList/MovieList';
import MovieCards from './components/MovieCards/MovieCards';
import MovieDetails from './components/MovieDetails/MovieDetails';
import './App.css';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, selectedMovie } = useSelector((state: any) => state.movies);

  const [sortedMovies, setSortedMovies] = useState<Movie[]>(movies);
  const [isCardView, setIsCardView] = useState<boolean>(
    () => JSON.parse(localStorage.getItem('isCardView') || 'false')
  );
  const [filterText, setFilterText] = useState<string>(''); // State for filtering
  const [isMobilePopupOpen, setIsMobilePopupOpen] = useState<boolean>(false); // State for popup

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  useEffect(() => {
    const filteredMovies = movies.filter((movie: Movie) =>
      movie.title.toLowerCase().includes(filterText.toLowerCase()) ||
      `Episode ${movie.episode_id}`.toLowerCase().includes(filterText.toLowerCase())
    );
    setSortedMovies(filteredMovies);
  }, [movies, filterText]);

  const handleMovieSelect = (movie: Movie) => {
    dispatch(setSelectedMovie(movie));
    if (window.innerWidth <= 768) {
      setIsMobilePopupOpen(true);
    }
  };

  const handleSort = (criteria: string) => {
    let sorted = [...movies];
    switch (criteria) {
      case 'Episode':
        sorted.sort((a, b) => a.episode_id - b.episode_id);
        break;
      case 'Release Date':
        sorted.sort(
          (a, b) =>
            new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
        );
        break;
      case 'Rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    setSortedMovies(sorted);
  };

  const toggleView = () => {
    const newView = !isCardView;
    setIsCardView(newView);
    localStorage.setItem('isCardView', JSON.stringify(newView));
  };

  const closeMobilePopup = () => {
    setIsMobilePopupOpen(false);
  };

  return (
    <div className="app-container">
      <div className="navbar">
        <div className="dropdown">
          <button className="sort-by-btn">Sort By</button>
          <div className="dropdown-content">
            <button onClick={() => handleSort('Episode')}>Episode</button>
            <button onClick={() => handleSort('Release Date')}>Release Date</button>
            <button onClick={() => handleSort('Rating')}>Rating</button>
          </div>
        </div>
        <input
          type="text"
          className="filter-input"
          placeholder="Filter movies..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>
      <div className="content">
        <div className="movie-list-section">
          <div className="toggle-container">
            <div className="toggle-view">
              <span className={!isCardView ? 'active' : ''}>List</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={isCardView}
                  onChange={toggleView}
                />
                <span className="slider"></span>
              </label>
              <span className={isCardView ? 'active' : ''}>Cards</span>
            </div>
          </div>
          {isCardView ? (
            <MovieCards movies={sortedMovies} onMovieSelect={handleMovieSelect} />
          ) : (
            <MovieList
              movies={sortedMovies}
              onMovieSelect={handleMovieSelect}
              selectedMovie={selectedMovie}
            />
          )}
        </div>
        <div className="movie-details-section">
          {!isMobilePopupOpen && selectedMovie ? (
            <MovieDetails movie={selectedMovie} />
          ) : (
            <p className="no-selection">Select a movie to view details.</p>
          )}
        </div>
        {isMobilePopupOpen && (
          <div className="mobile-popup">
            <button className="close-popup-btn" onClick={closeMobilePopup}>✖</button>
            <MovieDetails movie={selectedMovie} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
