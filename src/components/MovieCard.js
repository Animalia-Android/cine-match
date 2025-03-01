import { motion } from 'framer-motion';
import Image from 'next/image';

const MovieCard = ({ movie, onClick, toggleWatchlist, isInWatchlist }) => {
  return (
    <div
      className="relative cursor-pointer transition-transform transform hover:scale-105"
      onClick={() => onClick(movie.id)} // Ensure the movie ID is passed
    >
      <Image
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : '/placeholder.jpg'
        }
        alt={movie.title}
        width={500}
        height={750}
        className="rounded-lg shadow-lg w-full"
        placeholder="blur" // Shows a blur before loading
        blurDataURL="/placeholder.jpg" // Uses a low-quality image as a placeholder
        priority // Loads immediately, reducing flickering
      />
      <div className="absolute bottom-0 left-0 bg-black bg-opacity-70 w-full p-2 text-white">
        <h3 className="text-sm font-semibold">{movie.title}</h3>
      </div>
      <button
        className={`absolute top-2 right-2 p-2 rounded-full ${
          isInWatchlist ? 'bg-yellow-500' : 'bg-gray-800'
        }`}
        onClick={(e) => {
          e.stopPropagation(); // Prevent modal from opening when clicking the watchlist button
          toggleWatchlist(movie);
        }}
      >
        {isInWatchlist ? '⭐' : '☆'}
      </button>
    </div>
  );
};

export default MovieCard;
