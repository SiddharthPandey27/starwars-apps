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
  plot: string;
  actors: string;
  awards: string;
  language: string;
  runtime: string;
  genre: string;
  rated: string;
  writer: string;
  imdbVotes: string;
  boxOffice: string;
  imdbID: string;
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

// Fetch movies main info with SWAPI API and then all other info from OMDB API
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (_, { rejectWithValue }) => {
    try {
      const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY;

      const swapiResponse = await axios.get('https://swapi.py4e.com/api/films/?format=json');
      const movies = swapiResponse.data.results;

      const enhancedMovies = await Promise.all(
        movies.map(async (movie: any) => {
          const episodeRomanId = toRoman(movie.episode_id);
          const customStarWarsTitle = `Star Wars: Episode ${episodeRomanId} ${movie.title}`;

          const omdbResponse = await axios.get(
            `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${encodeURIComponent(
              customStarWarsTitle
            )}`
          );
          const omdbData = omdbResponse.data;

          return {
            title: movie.title,
            episode_id: movie.episode_id,
            opening_crawl: movie.opening_crawl,
            director: movie.director,
            producer: movie.producer,
            release_date: omdbData.Released,
            description: omdbData.Plot || movie.opening_crawl,
            image: omdbData.Poster || `https://starwars-visualguide.com/assets/img/films/${movie.episode_id}.jpg`,
            rating: parseFloat(omdbData.imdbRating) || Math.random() * (5 - 3) + 3,
            imdbRating: omdbData.imdbRating || 'N/A',
            rottenTomatoes:
              omdbData.Ratings.find((r: any) => r.Source === 'Rotten Tomatoes')?.Value || 'N/A',
            metacritic: omdbData.Ratings.find((r: any) => r.Source === 'Metacritic')?.Value || 'N/A',
            plot: omdbData.Plot || '',
            actors: omdbData.Actors || '',
            awards: omdbData.Awards || '',
            language: omdbData.Language || '',
            runtime: omdbData.Runtime || '',
            genre: omdbData.Genre || '',
            rated: omdbData.Rated || 'N/A',
            writer: omdbData.Writer || '',
            imdbVotes: omdbData.imdbVotes || 'N/A',
            boxOffice: omdbData.BoxOffice || 'N/A',
            imdbID: omdbData.imdbID || '',
          };
        })
      );

      return enhancedMovies.sort((a: any, b: any) => a.episode_id - b.episode_id);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch movies.');
    }
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSelectedMovie(state, action: PayloadAction<Movie>) {
      state.selectedMovie = action.payload;
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

export const { setSelectedMovie } = moviesSlice.actions;
export default moviesSlice.reducer;

function toRoman(num: number): string {
  const romanNumeralMap: { [key: number]: string } = {
    1: 'I',
    2: 'II',
    3: 'III',
    4: 'IV',
    5: 'V',
    6: 'VI',
    7: 'VII',
    8: 'VIII',
    9: 'IX',
    10: 'X',
  };
  return romanNumeralMap[num] || num.toString();
}
