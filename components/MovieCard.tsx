import React from 'react';
import Image from 'next/image';

interface MovieCardProps {
  title: string;
  posterUrl: string;
  releaseDate: string;
  onClick: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, posterUrl, releaseDate, onClick }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer" onClick={onClick}>
      <Image
        src={posterUrl}
        alt={title}
        width={300}
        height={450}
        className="w-full h-auto object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-gray-400">{releaseDate}</p>
      </div>
    </div>
  );
};

export default MovieCard;
