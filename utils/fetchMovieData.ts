export const fetchMovieData = async (movieId: string) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`);
    return response.json();
  };
  