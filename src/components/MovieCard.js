import { motion } from 'framer-motion';

export default function MovieCard({ movie, toggleWatchlist, isInWatchlist }) {
  return (
    <motion.div
      className="bg-gray-800 p-4 rounded-lg cursor-pointer"
      whileHover={{
        scale: 1.05,
        boxShadow: '0px 4px 10px rgba(255, 255, 255, 0.2)',
      }}
      transition={{ duration: 0.2 }}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="rounded-md shadow-md"
      />
      <h2 className="text-lg font-semibold mt-3 text-center">{movie.title}</h2>

      <motion.button
        className={`mt-3 w-full p-2 rounded-md ${
          isInWatchlist ? 'bg-red-500' : 'bg-yellow-400'
        } hover:opacity-80 transition`}
        whileTap={{ scale: 0.9 }}
        onClick={() => toggleWatchlist(movie)}
      >
        {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
      </motion.button>
    </motion.div>
  );
}
