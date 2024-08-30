"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../app/globals.css";

const HomePage = () => {
  const [popularMovie, setPopularMovie] = useState<any>(null);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [moviesByCategory, setMoviesByCategory] = useState<any>({});
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredMovies, setFilteredMovies] = useState<any[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchPopularMovie = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`
      );
      const data = await response.json();
      const movie = data.results[0];
      setPopularMovie(movie);

      const trailerResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );
      const trailerData = await trailerResponse.json();
      const trailer = trailerData.results.find(
        (video: any) => video.type === "Trailer" && video.site === "YouTube"
      );

      if (trailer) {
        setTrailerKey(trailer.key);
      }
    };

    const fetchCategoriesAndMovies = async () => {
      const genresResponse = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
      );
      const genresData = await genresResponse.json();
      setCategories(genresData.genres);

      const promises = genresData.genres.map(async (genre: any) => {
        const moviesResponse = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=${genre.id}&language=en-US`
        );
        const moviesData = await moviesResponse.json();
        return { genre, movies: moviesData.results };
      });

      const categoriesMovies = await Promise.all(promises);
      const moviesByCategoryData = categoriesMovies.reduce(
        (acc: any, { genre, movies }: any) => {
          acc[genre.id] = { genre, movies };
          return acc;
        },
        {}
      );

      setMoviesByCategory(moviesByCategoryData);
    };

    fetchPopularMovie();
    fetchCategoriesAndMovies();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const searchMovies = () => {
        const results = Object.values(moviesByCategory)
          .flatMap((category: any) => category.movies)
          .filter((movie: any) =>
            movie.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
        setFilteredMovies(results);
      };
      searchMovies();
    } else {
      setFilteredMovies([]);
    }
  }, [searchTerm, moviesByCategory]);

  if (!popularMovie || !categories.length) {
    return <div className="text-center text-white p-8">Loading...</div>;
  }

  return (
    <div className="relative overflow-hidden bg-gray-900">
      <div
        className="relative z-10 text-white p-8 md:p-16 bg-black bg-opacity-50 h-full flex flex-col justify-center zoom-in fade-in"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${popularMovie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4">
          {popularMovie.title}
        </h1>
        <p className="text-lg md:text-2xl mb-6">{popularMovie.overview}</p>

        {trailerKey && (
          <div className="mb-6 aspect-w-16 aspect-h-9 zoom-in fade-in">
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        <a
          href={`https://vidsrc.xyz/embed/movie?tmdb=${popularMovie.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition-transform transform hover:scale-105"
        >
          Watch Now
        </a>

        <button
          onClick={() => router.push("/search")}
          className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          Search Movies
        </button>
      </div>

      <div className="pt-32 pb-8 px-8 md:px-16 bg-gray-800 text-white">
        <h2 className="text-4xl font-bold mb-6 fade-in">Categories</h2>
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 bg-gray-700 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {searchTerm && filteredMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {filteredMovies.map((movie: any) => (
              <div
                key={movie.id}
                className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 text-center">
                  <h4 className="text-lg font-semibold mb-2">{movie.title}</h4>
                  <p className="text-sm mb-2">
                    {new Date(movie.release_date).toLocaleDateString()}
                  </p>
                  <p className="text-sm mb-4">
                    {movie.overview.substring(0, 100)}...
                  </p>
                  <a
                    href={`https://vidsrc.xyz/embed/movie?tmdb=${movie.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-500 hover:underline"
                  >
                    Watch
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          categories.map((category) => (
            <div key={category.id} className="mb-12 zoom-in fade-in">
              <h3 className="text-3xl font-semibold mb-4">{category.name}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {moviesByCategory[category.id]?.movies
                  .slice(0, 6)
                  .map((movie: any) => (
                    <div
                      key={movie.id}
                      className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105"
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-4 text-center">
                        <h4 className="text-lg font-semibold mb-2">
                          {movie.title}
                        </h4>
                        <p className="text-sm mb-2">
                          {new Date(movie.release_date).toLocaleDateString()}
                        </p>
                        <p className="text-sm mb-4">
                          {movie.overview.substring(0, 100)}...
                        </p>
                        <a
                          href={`https://vidsrc.xyz/embed/movie?tmdb=${movie.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-500 hover:underline"
                        >
                          Watch
                        </a>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
