import MovieCard from '@/components/MovieCard';

export default function NowPlaying({
  theaterMovies,
  toggleWatchlist,
  watchlist,
  setSelectedMovieId,
}) {
  return (
    <div>
      {/* Movies in Theaters */}
      <h2 className="text-2xl font-bold mt-8 mb-4 text-yellow-400">
        🎥 Now Playing
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {theaterMovies.map((movie) => (
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
