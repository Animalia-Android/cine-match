// import { useState, useEffect } from 'react';
// import { auth } from '@/utils/firebase';
// import { onAuthStateChanged, signOut } from 'firebase/auth';
// import Link from 'next/link';
// import SearchBar from './SearchBar';

// const NavBar = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user);
//     });
//     return () => unsubscribe();
//   }, []);

//   const handleLogout = async () => {
//     await signOut(auth);
//     setUser(null);
//   };

//   return (
//     <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
//       <Link href="/" className="text-2xl font-bold text-yellow-400">
//         🎬 CineMatch
//       </Link>

//       <SearchBar />

//       <div className="flex space-x-4">
//         <Link href="/" className="hover:text-yellow-300">
//           Home
//         </Link>
//         <Link href="/watchlist" className="hover:text-yellow-300">
//           Watchlist
//         </Link>

//         {user ? (
//           <div className="flex items-center space-x-3">
//             <span className="text-sm text-gray-300">{user.email}</span>
//             <button
//               onClick={handleLogout}
//               className="bg-red-500 hover:bg-red-700 px-3 py-1 rounded"
//             >
//               Logout
//             </button>
//           </div>
//         ) : (
//           <Link
//             href="/auth"
//             className="bg-blue-500 hover:bg-blue-700 px-3 py-1 rounded"
//           >
//             Login
//           </Link>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default NavBar;

import { useState, useEffect } from 'react';
import { auth } from '@/utils/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SearchBar from './SearchBar';

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
    router.push('/'); // Redirect to home after logout
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-md">
      {/* Logo */}
      <Link href="/" className="text-3xl font-bold text-yellow-400">
        🎬 CineMatch
      </Link>

      {/* Search Bar */}
      <div className="hidden sm:block flex-grow mx-6">
        <SearchBar />
      </div>

      {/* Nav Links & User Menu */}
      <div className="flex items-center space-x-6">
        <Link href="/" className="hover:text-yellow-300 transition">
          Home
        </Link>
        <Link href="/watchlist" className="hover:text-yellow-300 transition">
          Watchlist
        </Link>

        {user ? (
          <div className="relative">
            {/* User Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-full hover:bg-gray-700 transition"
            >
              <span className="text-sm text-gray-300">{user.email}</span>
              <span>▼</span>
            </button>

            {/* Dropdown Menu */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-gray-800 shadow-lg rounded-md py-2">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/auth"
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded transition"
          >
            Login
          </Link>
        )}
      </div>

      {/* Mobile Search Bar (Visible on Small Screens) */}
      <div className="sm:hidden w-full mt-4">
        <SearchBar />
      </div>
    </nav>
  );
};

export default NavBar;
