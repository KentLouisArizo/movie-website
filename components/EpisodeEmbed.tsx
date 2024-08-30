import React from 'react';

interface EpisodeEmbedProps {
  showId: string;
  season: number;
  episode: number;
}

const EpisodeEmbed: React.FC<EpisodeEmbedProps> = ({ showId, season, episode }) => {
  return (
    <iframe
      src={`https://vidsrc.xyz/embed/tv?tmdb=${showId}&season=${season}&episode=${episode}`}
      width="100%"
      height="100%"
      frameBorder="0"
      allowFullScreen
      title="Episode Embed"
    ></iframe>
  );
};

export default EpisodeEmbed;
