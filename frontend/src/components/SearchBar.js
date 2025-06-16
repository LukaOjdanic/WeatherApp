import React from 'react';

function SearchBar({ city, setCity, onSearch, isLoading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name..."
        className="flex-grow w-full px-4 py-2 text-stone-700 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-150 ease-in-out"
        disabled={isLoading}
      />
      <button
        type="submit"
        className="w-full sm:w-auto px-6 py-2 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition duration-150 ease-in-out disabled:bg-sky-400 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}

export default SearchBar;