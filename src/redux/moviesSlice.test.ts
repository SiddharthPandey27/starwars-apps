import reducer, { fetchMovies, setSelectedMovie, MoviesState } from './moviesSlice';
import mockMovies from '../__mocks__/mockMovies';

describe('moviesSlice', () => {
  const initialState: MoviesState = {
    movies: [],
    selectedMovie: null,
    loading: false,
    error: null,
  };

  it('should handle initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setSelectedMovie', () => {
    const state = reducer(initialState, setSelectedMovie(mockMovies[0]));
    expect(state.selectedMovie).toEqual(mockMovies[0]);
  });

  it('should handle fetchMovies.fulfilled', () => {
    const fulfilledState = reducer(
      initialState,
      { type: fetchMovies.fulfilled.type, payload: mockMovies }
    );
    expect(fulfilledState.movies).toEqual(mockMovies);
    expect(fulfilledState.loading).toBe(false);
  });

  it('should handle fetchMovies.pending', () => {
    const pendingState = reducer(initialState, { type: fetchMovies.pending.type });
    expect(pendingState.loading).toBe(true);
  });

  it('should handle fetchMovies.rejected', () => {
    const errorMessage = 'Failed to fetch movies.';
    const rejectedState = reducer(
      initialState,
      { type: fetchMovies.rejected.type, payload: errorMessage }
    );
    expect(rejectedState.error).toEqual(errorMessage);
    expect(rejectedState.loading).toBe(false);
  });
});
