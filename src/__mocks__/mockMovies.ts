import { Movie } from '../redux/moviesSlice';

const mockMovies: Movie[] = [
  {
    title: 'The Phantom Menace',
    episode_id: 1,
    opening_crawl: '',
    director: '',
    producer: '',
    release_date: '1999-05-19',
    description: '',
    image: 'path/to/image.jpg',
    rating: 4.5,
    imdbRating: '76%',
    rottenTomatoes: '79%',
    metacritic: '68%',
    plot: 'A long time ago...',
    actors: 'Liam Neeson, Ewan McGregor',
    awards: 'Won 3 Oscars',
    language: 'English',
    runtime: '136 min',
    genre: 'Action, Sci-Fi',
    rated: 'PG',
    writer: 'George Lucas',
    imdbVotes: '1,200,000',
    boxOffice: '$400,000,000',
    imdbID: 'tt0120915',
  },
];

export default mockMovies;

