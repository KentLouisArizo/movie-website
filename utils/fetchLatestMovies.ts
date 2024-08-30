export const fetchLatestMovies = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/latest?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`);
    return response.json();
  };
  