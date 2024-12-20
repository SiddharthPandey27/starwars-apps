import { Movie } from '../redux/moviesSlice';

export const mockMovies: Movie[] = [
  {
    title: 'The Phantom Menace',
    episode_id: 1,
    opening_crawl: '',
    director: 'George Lucas',
    producer: 'Rick McCallum',
    release_date: '1999-05-19',
    description: '',
    image: '',
    rating: 4.5,
    imdbRating: '76%',
    rottenTomatoes: '79%',
    metacritic: '68%',
  },
  {
    title: 'Attack of the Clones',
    episode_id: 2,
    opening_crawl: '',
    director: 'George Lucas',
    producer: 'Rick McCallum',
    release_date: '2002-05-16',
    description: '',
    image: '',
    rating: 3.5,
    imdbRating: '72%',
    rottenTomatoes: '75%',
    metacritic: '60%',
  },
];
