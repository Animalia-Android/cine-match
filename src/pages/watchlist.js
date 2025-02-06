import { useState, useEffect } from 'react';
import MovieCard from '@/components/MovieCard';
import { useRouter } from 'next/router';

import { auth } from '@/utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function Watchlist() {
  const router = useRouter(); // Use Next.js router
  const [watchlist, setWatchlist] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    setWatchlist(savedWatchlist);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/auth'); // Redirect to login if not logged in
      } else {
        setUser(user);
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (user === null) {
    return (
      <p className="text-center text-white mt-10">Redirecting to login...</p>
    );
  }

  const removeFromWatchlist = (movie) => {
    const updatedList = watchlist.filter((m) => m.id !== movie.id);
    setWatchlist(updatedList);
    localStorage.setItem('watchlist', JSON.stringify(updatedList));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      {/* Back Button */}
      <button
        onClick={() => router.push('/')}
        className="mb-4 bg-gray-700 px-5 py-2 rounded-md text-white hover:bg-gray-600 transition"
      >
        🔙 Back to Home
      </button>
      <h1 className="text-4xl font-bold mb-6 text-center text-yellow-400">
        ⭐ My Watchlist
      </h1>

      {watchlist.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {watchlist.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              toggleWatchlist={removeFromWatchlist}
              isInWatchlist={true}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 text-lg">
          Your watchlist is empty.
        </p>
      )}
    </div>
  );
}
