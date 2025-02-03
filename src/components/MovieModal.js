import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
// import { CustomButton } from '@/components/ui/CustomButton';

const MovieModal = ({ movieId, onClose }) => {
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!movieId) return;

    console.log('MovieModal received movieId:', movieId); // Debugging

    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const [movieRes, creditsRes, videosRes, similarRes] = await Promise.all(
          [
            fetch(
              `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
            ),
            fetch(
              `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
            ),
            fetch(
              `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
            ),
            fetch(
              `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
            ),
          ]
        );

        const movieData = await movieRes.json();
        const creditsData = await creditsRes.json();
        const videosData = await videosRes.json();
        const similarData = await similarRes.json();

        setMovie(movieData);
        setCast(creditsData.cast ? creditsData.cast.slice(0, 5) : []);
        setSimilarMovies(
          similarData.results ? similarData.results.slice(0, 5) : []
        );

        const officialTrailer = videosData.results
          ? videosData.results.find(
              (video) => video.type === 'Trailer' && video.site === 'YouTube'
            )
          : null;
        setTrailer(
          officialTrailer
            ? `https://www.youtube.com/embed/${officialTrailer.key}`
            : null
        );
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  return (
    <Dialog.Root open={Boolean(movieId)} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-3xl bg-gray-900 text-white p-4 rounded-2xl shadow-xl max-h-[80vh] overflow-y-auto">
          {loading ? (
            <p className="text-center">Loading movie details...</p>
          ) : movie ? (
            <div>
              <div className="flex flex-col md:flex-row">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full md:w-1/3 rounded-lg shadow-lg"
                />
                <div className="ml-4 flex-1">
                  <h2 className="text-2xl font-bold">{movie.title}</h2>
                  <p className="text-sm text-gray-400">
                    {movie.release_date} • {movie.runtime} min
                  </p>
                  <p className="italic text-gray-300 mt-1">{movie.tagline}</p>
                  <p className="mt-2">{movie.overview}</p>
                  <p className="mt-2 font-bold">
                    Rating: {movie.vote_average}/10
                  </p>
                  <p className="mt-2 font-bold">
                    Genres:{' '}
                    {movie.genres
                      ? movie.genres.map((genre) => genre.name).join(', ')
                      : 'N/A'}
                  </p>
                  <p className="mt-2 font-bold">
                    Director:{' '}
                    {movie.credits?.crew.find(
                      (person) => person.job === 'Director'
                    )?.name || 'Unknown'}
                  </p>
                  <p className="mt-2 font-bold">
                    Cast:{' '}
                    {cast
                      .map((actor) => `${actor.name} (${actor.character})`)
                      .join(', ')}
                  </p>
                </div>
              </div>
              {trailer && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">Watch Trailer</h3>
                  <iframe
                    width="100%"
                    height="315"
                    src={trailer}
                    title="Movie Trailer"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
              {/* Similar Movies Section */}
              {similarMovies.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold">Similar Movies</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                    {similarMovies.map((similar) => (
                      <div
                        key={similar.id}
                        className="cursor-pointer"
                        onClick={() => {
                          onClose(); // Close current modal
                          setTimeout(
                            () =>
                              window.dispatchEvent(
                                new CustomEvent('openMovie', {
                                  detail: similar.id,
                                })
                              ),
                            300
                          );
                        }}
                      >
                        <img
                          src={`https://image.tmdb.org/t/p/w200${similar.poster_path}`}
                          alt={similar.title}
                          className="rounded-lg shadow-md"
                        />
                        <p className="text-sm mt-2 text-center">
                          {similar.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="mt-4 flex justify-end">
                <Dialog.Close asChild>
                  <div className="bg-red-500 hover:bg-red-700">Close</div>
                </Dialog.Close>
              </div>
            </div>
          ) : (
            <p className="text-center">No movie selected.</p>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default MovieModal;
