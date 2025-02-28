import { useState } from 'react';
import { useRouter } from 'next/router';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex justify-center mb-6">
      <input
        type="text"
        placeholder="Search for a movie..."
        className="w-full max-w-md p-3 rounded-l-md text-black outline-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        type="submit"
        className="bg-yellow-400 px-5 py-3 rounded-r-md hover:bg-yellow-500 transition"
      >
        🔍
      </button>
    </form>
  );
};

export default SearchBar;
