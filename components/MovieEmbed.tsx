import React from 'react';

interface MovieEmbedProps {
  movieId: string;
}

const MovieEmbed: React.FC<MovieEmbedProps> = ({ movieId }) => {
  return (
    <iframe
      src={`https://vidsrc.xyz/embed/movie?tmdb=${movieId}`}
      width="100%"
      height="100%"
      frameBorder="0"
      allowFullScreen
      title="Movie Embed"
    ></iframe>
  );
};

export default MovieEmbed;
