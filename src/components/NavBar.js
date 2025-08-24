import { useState, useEffect } from 'react';
import { auth } from '@/utils/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SearchBar from './SearchBar';
import { Home, HomeIcon, Popcorn } from 'lucide-react';

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    router.push('/');
  };

  return (
    <nav className="bg-gray-900 text-white px-4 md:px-6 py-4 shadow-md sticky top-0 z-40">
      <div
        className="mx-auto max-w-7xl
                    flex flex-wrap items-center gap-3 md:gap-6
                    md:grid md:grid-cols-[auto,1fr,auto]"
      >
        {/* Logo */}
        <Link
          href="/"
          className="order-1 shrink-0 text-2xl font-bold text-yellow-400"
        >
          🎬 CineMatch
        </Link>

        {/* Desktop Search (md+) */}
        <div className="order-2 hidden md:block md:flex-1 min-w-0">
          <SearchBar className="w-full min-w-0" />
        </div>

        {/* Desktop actions */}
        <div className="order-3 hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="hover:text-yellow-300 transition"
            aria-label="Home"
          >
            <Home className="inline mr-1" aria-hidden="true" />
          </Link>
          <Link
            href="/watchlist"
            className="hover:text-yellow-300 transition"
            aria-label="Watchlist"
          >
            <Popcorn className="inline mr-1" aria-hidden="true" />
          </Link>
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/auth"
              className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="order-2 md:hidden ml-auto text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          ☰
        </button>

        {/* Mobile Search (visible below header) */}
        <div className="order-3 w-full md:hidden min-w-0">
          <SearchBar className="w-full min-w-0" />
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden absolute inset-x-0 top-full bg-gray-800 z-50
                   flex flex-col items-center space-y-4 py-4"
        >
          <Link
            href="/"
            className="hover:text-yellow-300 transition"
            aria-label="Home"
          >
            <HomeIcon className="inline mr-1" aria-hidden="true" />
          </Link>
          <Link
            href="/watchlist"
            className="hover:text-yellow-300 transition"
            aria-label="Watchlist"
          >
            <Popcorn className="inline mr-1" aria-hidden="true" />
          </Link>
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/auth"
              className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
