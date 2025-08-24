import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { searchMovies } from '@/utils/api';
import MovieCard from '@/components/MovieCard';
import MovieModal from '@/components/MovieModal';

const SearchResults = () => {
  const router = useRouter();
  const { query } = router.query;
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  useEffect(() => {
    if (query) {
      searchMovies(query).then(setMovies).catch(console.error);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <h1 className="text-2xl  md:text-3xl font-bold text-center text-yellow-400 mb-6">
        Search results for: {query}
      </h1>

      {movies.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-auto max-w-6xl ">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => setSelectedMovieId(movie.id)}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">No movies found.</p>
      )}
      {selectedMovieId && (
        <MovieModal
          movieId={selectedMovieId}
          onClose={() => setSelectedMovieId(null)}
        />
      )}
    </div>
  );
};

export default SearchResults;
