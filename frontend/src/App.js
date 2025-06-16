import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import HistoryView from './components/HistoryView';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHistory = useCallback(async () => {
    try {
      const response = await fetch('/history/data');
      if (!response.ok) {
        throw new Error('Failed to fetch history');
      }
      const data = await response.json();
      setHistoryData(data);
    } catch (err) {
      console.error("History fetch error:", err.message);
      // Don't show history fetch errors to the user to avoid clutter
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleSearch = async () => {
    if (!city) return;

    setIsLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const response = await fetch(`/api/weather/${city}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `An error occurred (${response.status})`);
      }
      
      setWeatherData(data.current_weather);
      await fetchHistory(); // Reefresh history after a successful search

    } catch (err) {
      setError(err.message);
      console.error("Search error:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-sky-700">Weather Dashboard</h1>
          <p className="text-stone-500 mt-2">Get current weather conditions and see your search history.</p>
        </header>
        
        <main>
          <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
            <SearchBar city={city} setCity={setCity} onSearch={handleSearch} isLoading={isLoading} />
          </div>

          <div className="min-h-[200px]">
            {isLoading && <p className="text-center text-sky-600">Loading...</p>}
            {error && <p className="text-center text-red-500 bg-red-100 p-3 rounded-lg">{error}</p>}
            {weatherData && <WeatherDisplay data={weatherData} />}
            {!isLoading && !error && !weatherData && (
              <div className="text-center text-stone-500">
                <p>Enter a city above to get the latest weather information.</p>
              </div>
            )}
          </div>
          
          <HistoryView history={historyData} />
        </main>
        
        <footer className="text-center mt-12 text-xs text-stone-400">
          <p>Weather Dashboard | Powered by React & Docker</p>
        </footer>
      </div>
    </div>
  );
}

export default App;