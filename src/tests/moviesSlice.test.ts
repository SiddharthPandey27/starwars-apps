import moviesReducer, { fetchMovies, setSelectedMovie, Movie } from '../redux/moviesSlice';

describe('moviesSlice', () => {
  it('should handle initial state', () => {
    expect(moviesReducer(undefined, { type: 'unknown' })).toEqual({
      movies: [],
      selectedMovie: null,
      loading: false,
      error: '',
    });
  });

  it('should set selected movie', () => {
    const previousState = { movies: [], selectedMovie: null, loading: false, error: '' };

    // Create a mock movie matching the full Movie interface
    const newMovie: Movie = {
      episode_id: 1,
      title: 'Test Movie',
      opening_crawl: 'A long time ago...',
      director: 'George Lucas',
      producer: 'Gary Kurtz',
      release_date: '1977-05-25',
      description: 'Description here',
      image: 'https://example.com/poster.jpg',
      rating: 4.5,
      imdbRating: '76%',
      rottenTomatoes: '79%',
      metacritic: '68%',
    };

    const newState = moviesReducer(previousState, setSelectedMovie(newMovie));
    expect(newState.selectedMovie).toEqual(newMovie);
  });
});
