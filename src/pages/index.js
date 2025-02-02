import { useEffect, useState } from 'react';
import MovieCard from '@/components/MovieCard';
import { fetchPopularMovies, searchMovies } from '@/utils/api'; // Removed fetchGenres

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const moviesData = await fetchPopularMovies();
      setMovies(moviesData);
    };

    getMovies();
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

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search for a movie..."
          className="w-full max-w-md p-3 rounded-l-md text-black outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-yellow-400 px-5 py-3 rounded-r-md hover:bg-yellow-500 transition"
        >
          🔍
        </button>
      </form>

      {/* Genre Dropdown */}
      <div className="flex justify-center mb-6">
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
      </div>

      {/*Watchlist Link*/}
      <div className="flex justify-center mb-6">
        <a
          href="/watchlist"
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition"
        >
          ⭐ View My Watchlist
        </a>
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies?.length > 0 ? (
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              toggleWatchlist={toggleWatchlist}
              isInWatchlist={watchlist.some((m) => m.id === movie.id)}
            />
          ))
        ) : (
          <p className="text-center text-gray-400 text-lg col-span-full">
            No movies found.
          </p>
        )}
      </div>
    </div>
  );
}
