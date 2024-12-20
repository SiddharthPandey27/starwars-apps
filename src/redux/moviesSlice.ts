import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Movie {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  description: string;
  image: string;
  rating: number;
  imdbRating: string;
  rottenTomatoes: string;
  metacritic: string;
}

export interface MoviesState {
  movies: Movie[];
  selectedMovie: Movie | null;
  loading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  movies: [],
  selectedMovie: null,
  loading: false,
  error: null,
};

// Async thunk to fetch movies from API
export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await axios.get('https://swapi.py4e.com/api/films/?format=json');
  return response.data.results.map((movie: any) => ({
    title: movie.title,
    episode_id: movie.episode_id,
    opening_crawl: movie.opening_crawl,
    director: movie.director,
    producer: movie.producer,
    release_date: movie.release_date,
    description: movie.opening_crawl,
    image: `https://starwars-visualguide.com/assets/img/films/${movie.episode_id}.jpg`,
    rating: Math.random() * (5 - 3) + 3,
    imdbRating: '76%',
    rottenTomatoes: '79%',
    metacritic: '68%',
  }));
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSelectedMovie(state, action: PayloadAction<Movie>) {
      state.selectedMovie = action.payload;
    },
    setMovies(state, action: PayloadAction<Movie[]>) {
      state.movies = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.sort((a: any, b: any) => a.episode_id - b.episode_id); // Default sort by episode
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch movies.';
      });
  },
});

export const { setSelectedMovie, setMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
