"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation
import '../globals.css'; // Correct path to globals.css

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchTerm) {
        setLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${searchTerm}&language=en-US`
        );
        const data = await response.json();
        setSearchResults(data.results);
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  return (
    <div className="p-8 md:p-16 bg-gray-900 text-white min-h-screen">
      {/* Back Button */}
      <button
        onClick={() => router.back()} // Navigate to the previous page
        className="mb-6 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
      >
        Back
      </button>
      <h1 className="text-4xl font-bold mb-6">Search Results</h1>
      <input
        type="text"
        placeholder="Search for movies..."
        className="w-full p-3 bg-gray-800 text-white rounded-lg mb-6"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading && <p>Loading...</p>}
      <div className="flex flex-wrap gap-4">
        {searchResults.map((movie: any) => (
          <div key={movie.id} className="w-64 bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-80 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
              <p className="text-sm mb-2">{movie.release_date}</p>
              <p className="text-sm mb-4">{movie.overview.length > 100 ? movie.overview.slice(0, 100) + '...' : movie.overview}</p>
              <a
                href={`https://vidsrc.xyz/embed/movie?tmdb=${movie.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
              >
                Watch
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
