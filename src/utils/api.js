// export async function fetchPopularMovies() {
//   try {
//     const res = await fetch(
//       `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
//     );
//     const data = await res.json();
//     return data.results || [];
//   } catch (error) {
//     console.error('Error fetching movies:', error);
//     return [];
//   }
// }

// export async function searchMovies(query) {
//   try {
//     const res = await fetch(
//       `https://api.themoviedb.org/3/search/movie?api_key=${
//         process.env.NEXT_PUBLIC_TMDB_API_KEY
//       }&query=${encodeURIComponent(query)}`
//     );
//     const data = await res.json();
//     return data.results || [];
//   } catch (error) {
//     console.error('Error searching movies:', error);
//     return [];
//   }
// }

// export async function fetchGenres() {
//   try {
//     const res = await fetch(
//       `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
//     );
//     const data = await res.json();
//     return data.genres || [];
//   } catch (error) {
//     console.error('Error fetching genres:', error);
//     return [];
//   }
// }

export const fetchNowPlaying = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  );
  const data = await res.json();
  return data.results;
};

export const fetchTrending = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  );
  const data = await res.json();
  return data.results;
};

export const fetchRecommended = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  );
  const data = await res.json();
  return data.results;
};

export const fetchGenres = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  );
  const data = await res.json();
  return data.genres;
};

export const searchMovies = async (query) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${query}`
  );
  const data = await res.json();
  return data.results;
};
