import { useEffect, useState } from 'react';
import MovieCard from '@/components/MovieCard';
import { fetchPopularMovies, searchMovies } from '@/utils/api'; // Removed fetchGenres
import MovieModal from '@/components/MovieModal';
import NowPlaying from '@/components/NowPlaying';
import Trending from '@/components/Trending';
import TopPicks from '@/components/TopPicks';
import SearchBar from '@/components/SearchBar';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [watchlist, setWatchlist] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const [theaterMovies, setTheaterMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  useEffect(() => {
    const handleOpenMovie = (e) => setSelectedMovieId(e.detail);
    window.addEventListener('openMovie', handleOpenMovie);
    return () => window.removeEventListener('openMovie', handleOpenMovie);
  }, []);

  // useEffect(() => {
  //   const getMovies = async () => {
  //     const moviesData = await fetchPopularMovies();
  //     setMovies(moviesData);
  //   };

  //   getMovies();
  // }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [theatersRes, trendingRes, recommendedRes] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
          ),
          fetch(
            `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
          ),
          fetch(
            `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
          ),
        ]);

        const [theatersData, trendingData, recommendedData] = await Promise.all(
          [theatersRes.json(), trendingRes.json(), recommendedRes.json()]
        );

        setTheaterMovies(theatersData.results);
        setTrendingMovies(trendingData.results);
        setRecommendedMovies(recommendedData.results);
      } catch (error) {
        console.error('Error fetching movie categories:', error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const getGenres = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );
      const data = await res.json();
      setGenres(data.genres || []);
    };

    getGenres();
  }, []);

  useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    setWatchlist(savedWatchlist);
  }, []);

  const toggleWatchlist = (movie) => {
    let updatedWatchlist;

    if (watchlist.some((m) => m.id === movie.id)) {
      updatedWatchlist = watchlist.filter((m) => m.id !== movie.id);
    } else {
      updatedWatchlist = [...watchlist, movie];
    }

    setWatchlist(updatedWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const searchResults = await searchMovies(searchQuery);
    setMovies(searchResults);
  };

  const handleGenreChange = async (e) => {
    const genreId = e.target.value;
    setSelectedGenre(genreId);

    if (!genreId) {
      const moviesData = await fetchPopularMovies();
      setMovies(moviesData);
      return;
    }

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=${genreId}`
      );
      const data = await res.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error('Error fetching movies by genre:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <h1 className="text-4xl font-bold mb-6 text-center text-yellow-400">
        🎬 CineMatch - Movie Finder
      </h1>

      {/* Genre Dropdown */}
      {/* <div className="flex justify-center mb-6">
        <select
          className="p-3 bg-gray-800 text-white rounded-md"
          value={selectedGenre}
          onChange={handleGenreChange}
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div> */}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 shadow-inner rounded-lg p-6 border border-gray-700 mb-6">
          {/* Movies in Theaters */}
          <NowPlaying
            theaterMovies={theaterMovies}
            toggleWatchlist={toggleWatchlist}
            watchlist={watchlist}
            setSelectedMovieId={setSelectedMovieId}
          />
        </div>

        <div className="bg-gray-800 shadow-inner rounded-lg p-6 border border-gray-700 mb-6">
          {/* Trending Movies */}
          <Trending
            trendingMovies={trendingMovies}
            toggleWatchlist={toggleWatchlist}
            watchlist={watchlist}
            setSelectedMovieId={setSelectedMovieId}
          />
        </div>

        <div className="bg-gray-800 shadow-inner rounded-lg p-6 border border-gray-700 mb-6">
          {/* Recommended Movies */}
          <TopPicks
            recommendedMovies={recommendedMovies}
            toggleWatchlist={toggleWatchlist}
            watchlist={watchlist}
            setSelectedMovieId={setSelectedMovieId}
          />
        </div>
      </div>

      {/* Pop up Movie Modal*/}
      <MovieModal
        movieId={selectedMovieId}
        onClose={() => setSelectedMovieId(null)}
      />
    </div>
  );
}
