export default function MovieCard({ movie, toggleWatchlist, isInWatchlist }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="rounded-md shadow-md"
      />
      <h2 className="text-lg font-semibold mt-3 text-center">{movie.title}</h2>

      <button
        className={`mt-3 w-full p-2 rounded-md ${
          isInWatchlist ? 'bg-red-500' : 'bg-yellow-400'
        } hover:opacity-80 transition`}
        onClick={() => toggleWatchlist(movie)}
      >
        {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
      </button>
    </div>
  );
}
