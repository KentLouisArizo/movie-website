// app/movie/[id]/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { fetchMovieData } from '../../../utils/fetchMovieData';

const MovieDetailsPage = ({ params }: { params: { id: string } }) => {
  const [movie, setMovie] = useState<any>(null);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const { id } = params;

  useEffect(() => {
    const loadMovie = async () => {
      const data = await fetchMovieData(id); // Fetch movie details using ID
      setMovie(data);

      // Fetch movie trailers from TMDB API
      const trailerResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );
      const trailerData = await trailerResponse.json();

      // Find the first YouTube trailer
      const trailer = trailerData.results.find(
        (video: any) => video.type === "Trailer" && video.site === "YouTube"
      );

      if (trailer) {
        setTrailerKey(trailer.key);
      }

      // Set embed URL for full movie from Vidsrc
      setEmbedUrl(`https://vidsrc.xyz/embed/movie?tmdb=${id}`);
    };

    loadMovie();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-auto mb-4"
      />
      <p className="mb-4">{movie.overview}</p>

      {/* Trailer Section */}
      {trailerKey ? (
        <div className="aspect-w-16 aspect-h-9 mb-4">
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
      ) : (
        <p>No trailer available</p>
      )}

      {/* Full Movie Embed Section */}
      {embedUrl ? (
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            width="100%"
            height="100%"
            src={embedUrl}
            title="Full Movie"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <p>No movie available</p>
      )}
    </div>
  );
};

export default MovieDetailsPage;
