import { useEffect, useState } from 'react';
import MovieCard from '@/components/MovieCard';
import { fetchPopularMovies, searchMovies } from '@/utils/api'; // Removed fetchGenres
import MovieModal from '@/components/MovieModal';

export default function TopPicks({
  recommendedMovies,
  toggleWatchlist,
  watchlist,
  setSelectedMovieId,
}) {
  return (
    <div>
      {/* Recommended Movies */}
      <h2 className="text-2xl font-bold mt-8 mb-4 text-yellow-400">
        ⭐ Top Picks
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {recommendedMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            toggleWatchlist={toggleWatchlist}
            isInWatchlist={watchlist.some((m) => m.id === movie.id)}
            onClick={() => setSelectedMovieId(movie.id)}
          />
        ))}
      </div>
    </div>
  );
}
