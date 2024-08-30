import React from 'react';

interface TvShowEmbedProps {
  showId: string;
}

const TvShowEmbed: React.FC<TvShowEmbedProps> = ({ showId }) => {
  return (
    <iframe
      src={`https://vidsrc.xyz/embed/tv?tmdb=${showId}`}
      width="100%"
      height="100%"
      frameBorder="0"
      allowFullScreen
      title="TV Show Embed"
    ></iframe>
  );
};

export default TvShowEmbed;
