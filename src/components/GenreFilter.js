import { useEffect, useState } from 'react';
import { fetchGenres } from '@/utils/api';

const GenreFilter = ({ onGenreChange }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetchGenres()
      .then(setGenres)
      .catch((error) => console.error('Error fetching genres:', error));
  }, []);

  return (
    <div className="flex justify-center mb-6">
      <select
        className="p-3 bg-gray-800 text-white rounded-md"
        onChange={onGenreChange}
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreFilter;
