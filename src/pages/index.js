import { useEffect, useState } from 'react';
import MovieCard from '@/components/MovieCard';
import { fetchPopularMovies } from '@/utils/api';
import { searchMovies } from '@/utils/api'; // Import the search function

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const getMovies = async () => {
      const moviesData = await fetchPopularMovies();
      setMovies(moviesData);
    };

    getMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const searchResults = await searchMovies(searchQuery);
    setMovies(searchResults);
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

      {/* Movie Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies?.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p className="text-center text-gray-400 text-lg col-span-full">
            No movies found.
          </p>
        )}
      </div>
    </div>
  );
}
