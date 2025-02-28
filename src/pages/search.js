import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { searchMovies } from '@/utils/api';
import MovieCard from '@/components/MovieCard';

const SearchResults = () => {
  const router = useRouter();
  const { query } = router.query;
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (query) {
      searchMovies(query).then(setMovies).catch(console.error);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <h1 className="text-3xl font-bold text-center text-yellow-400 mb-6">
        Search Results for: {query}
      </h1>

      {movies.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">No movies found.</p>
      )}
    </div>
  );
};

export default SearchResults;
