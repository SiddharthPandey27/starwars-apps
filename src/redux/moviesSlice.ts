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
  plot?: string;
  actors?: string;
  awards?: string;
  language?: string;
  runtime?: string;
  genre?: string;
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

// Helper to convert numbers to Roman numerals
const toRoman = (num: number): string => {
  const romanMap: { value: number; numeral: string }[] = [
    { value: 10, numeral: 'X' },
    { value: 9, numeral: 'IX' },
    { value: 5, numeral: 'V' },
    { value: 4, numeral: 'IV' },
    { value: 1, numeral: 'I' },
  ];

  let result = '';
  for (const { value, numeral } of romanMap) {
    while (num >= value) {
      result += numeral;
      num -= value;
    }
  }
  return result;
};

// Fetch movies from SWAPI and enhance with OMDB data
export const fetchMovies = createAsyncThunk('movies/fetchMovies', async (_, { rejectWithValue }) => {
  try {
    const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY;

    const swapiResponse = await axios.get('https://swapi.py4e.com/api/films/?format=json');
    const movies = swapiResponse.data.results;

    const enhancedMovies = await Promise.all(
      movies.map(async (movie: any) => {
        // Generate customStarWarsTitle
        const episodeRomanId = toRoman(movie.episode_id);
        const customStarWarsTitle = `Star Wars: Episode ${episodeRomanId} ${movie.title}`;

        // Fetch data from OMDB API
        const omdbResponse = await axios.get(
          `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${encodeURIComponent(customStarWarsTitle)}`
        );
        const omdbData = omdbResponse.data;

        return {
          title: movie.title,
          episode_id: movie.episode_id,
          opening_crawl: movie.opening_crawl,
          director: movie.director,
          producer: movie.producer,
          release_date: omdbData.Released || movie.release_date,
          description: omdbData.Plot || movie.opening_crawl,
          image: omdbData.Poster || `https://starwars-visualguide.com/assets/img/films/${movie.episode_id}.jpg`,
          rating: parseFloat(omdbData.imdbRating) || Math.random() * (5 - 3) + 3,
          imdbRating: omdbData.imdbRating || 'N/A',
          rottenTomatoes:
            omdbData.Ratings.find((r: any) => r.Source === 'Rotten Tomatoes')?.Value || 'N/A',
          metacritic:
            omdbData.Ratings.find((r: any) => r.Source === 'Metacritic')?.Value || 'N/A',
          plot: omdbData.Plot || '',
          actors: omdbData.Actors || '',
          awards: omdbData.Awards || '',
          language: omdbData.Language || '',
          runtime: omdbData.Runtime || '',
          genre: omdbData.Genre || '',
        };
      })
    );

    return enhancedMovies.sort((a: any, b: any) => a.episode_id - b.episode_id);
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to fetch movies.');
  }
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
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedMovie, setMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
