// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';

// const MovieDetails = () => {
//   const router = useRouter();
//   const { id } = router.query; // Get movie ID from URL
//   const [movie, setMovie] = useState(null);

//   useEffect(() => {
//     if (!id) return;
//     const fetchMovieDetails = async () => {
//       const res = await fetch(
//         `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=credits,videos`
//       );
//       const data = await res.json();
//       setMovie(data);
//     };
//     fetchMovieDetails();
//   }, [id]);

//   if (!movie) return <p className="text-white text-center">Loading...</p>;

//   return (
//     <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
//       <button
//         onClick={() => router.back()}
//         className="text-yellow-400 mb-4 hover:underline"
//       >
//         ← Back to Search
//       </button>

//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-4xl font-bold">{movie.title}</h1>
//         <p className="text-gray-400">{movie.tagline}</p>

//         {/* Movie Poster */}
//         <img
//           src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//           alt={movie.title}
//           className="rounded-md shadow-lg my-4"
//         />

//         {/* Movie Details */}
//         <p className="mt-4 text-lg">{movie.overview}</p>
//         <p className="mt-2 text-gray-400">Release Date: {movie.release_date}</p>
//         <p className="mt-2 text-gray-400">Runtime: {movie.runtime} min</p>

//         {/* Cast */}
//         <h2 className="text-2xl font-bold mt-6">Cast</h2>
//         <div className="flex flex-wrap gap-4 mt-2">
//           {movie.credits?.cast?.slice(0, 6).map((actor) => (
//             <div key={actor.id} className="text-center">
//               <img
//                 src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
//                 alt={actor.name}
//                 className="rounded-full w-20 h-20 object-cover"
//               />
//               <p className="text-sm mt-1">{actor.name}</p>
//             </div>
//           ))}
//         </div>

//         {/* Trailer */}
//         {movie.videos?.results?.length > 0 && (
//           <div className="mt-6">
//             <h2 className="text-2xl font-bold">Trailer</h2>
//             <iframe
//               width="100%"
//               height="315"
//               src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
//               title="Movie Trailer"
//               allowFullScreen
//               className="rounded-md mt-2"
//             ></iframe>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MovieDetails;

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
        Search Results for {query}
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
