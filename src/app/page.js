'use client';
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch('/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    setShortUrl(data.shortUrl);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-gray-800 p-8 rounded-lg shadow-2xl space-y-6">
        <h1 className="text-4xl font-semibold text-white text-center">URL Shortener</h1>
        <p className="text-center text-gray-300">Shorten your long URLs with ease!</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="url"
              placeholder="Enter your URL"
              className="w-full p-4 border border-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none bg-gray-700 text-white"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 4v2a6 6 0 1 1-6 6H6a8 8 0 1 0 8-8z" />
              </svg>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-lg bg-teal-600 text-white font-semibold transition duration-200 ease-in-out transform hover:scale-105 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Shortening...' : 'Shorten URL'}
          </button>
        </form>

        {shortUrl && (
          <div className="mt-6 text-center">
            <p className="text-lg font-medium text-gray-400">Your Shortened URL:</p>
            <a href={shortUrl} target="_blank" className="text-teal-400 font-bold text-xl hover:underline">{shortUrl}</a>
          </div>
        )}
      </div>
    </div>
  );
}
