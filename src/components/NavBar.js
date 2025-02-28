import { useState, useEffect } from 'react';
import { auth } from '@/utils/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Link from 'next/link';
import SearchBar from './SearchBar';

const NavBar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
      <Link href="/" className="text-2xl font-bold text-yellow-400">
        🎬 CineMatch
      </Link>

      <SearchBar />

      <div className="flex space-x-4">
        <Link href="/" className="hover:text-yellow-300">
          Home
        </Link>
        <Link href="/watchlist" className="hover:text-yellow-300">
          Watchlist
        </Link>

        {user ? (
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-300">{user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 px-3 py-1 rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            href="/auth"
            className="bg-blue-500 hover:bg-blue-700 px-3 py-1 rounded"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
