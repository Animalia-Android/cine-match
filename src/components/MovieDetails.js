import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { searchMovies } from '@/utils/api';
import MovieCard from '@/components/MovieCard';

const SearchResults = () => {
  const router = useRouter();
  const { query } = router.query; // Get search query from URL
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!query) return; // Don't fetch if there's no query
    const fetchSearchResults = async () => {
      const results = await searchMovies(query);
      setMovies(results);
    };
    fetchSearchResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-yellow-400">
        Search Results for "{query}"
      </h1>

      {movies.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => router.push(`/movie/${movie.id}`)} // Navigate to movie details
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">No movies found.</p>
      )}
    </div>
  );
};

export default SearchResults;
