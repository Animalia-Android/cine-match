// import { useState } from 'react';
// import { useRouter } from 'next/router';

// const SearchBar = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const router = useRouter();

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
//     }
//   };

//   return (
//     <form onSubmit={handleSearch} className="flex justify-center mb-6">
//       <input
//         type="text"
//         placeholder="Search for a movie..."
//         className="w-full max-w-md p-3 rounded-l-md text-black outline-none"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//       />
//       <button
//         type="submit"
//         className="bg-yellow-400 px-5 py-3 rounded-r-md hover:bg-yellow-500 transition"
//       >
//         🔍
//       </button>
//     </form>
//   );
// };

// export default SearchBar;

import { useState } from 'react';
import { useRouter } from 'next/router';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Navigate to the search results page with the query as a URL parameter
    router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  const handleClear = () => {
    setSearchQuery('');
    router.push('/'); // Redirects to the homepage
  };

  return (
    <form onSubmit={handleSearch} className="relative flex justify-center mb-6">
      {/* Search Input */}
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search for a movie..."
          className="w-full p-3 pr-10 rounded-md text-black outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Clear Button (Only Shows if Input is Not Empty) */}
        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-500 hover:bg-gray-400 text-white text-xs px-2 py-1 rounded-full transition"
          >
            ✖
          </button>
        )}
      </div>

      {/* Search Button */}
      <button
        type="submit"
        className="ml-2 bg-yellow-400 px-5 py-3 rounded-md hover:bg-yellow-500 transition"
      >
        🔍
      </button>
    </form>
  );
};

export default SearchBar;
