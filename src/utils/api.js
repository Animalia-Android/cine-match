export async function fetchPopularMovies() {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    );
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
}

export async function searchMovies(query) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${
        process.env.NEXT_PUBLIC_TMDB_API_KEY
      }&query=${encodeURIComponent(query)}`
    );
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
}
