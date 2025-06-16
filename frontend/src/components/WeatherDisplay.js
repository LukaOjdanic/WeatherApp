import React from 'react';

function WeatherDisplay({ data }) {
  if (!data) return null;

  const { name, main, weather, sys } = data;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  const temp = Math.round(main.temp);
  const description = weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1);

  return (
    <div className="bg-gradient-to-br from-sky-500 to-sky-700 text-white p-6 rounded-xl shadow-xl animate-fade-in">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold">{name}, {sys.country}</h2>
          <p className="text-sky-200">{description}</p>
        </div>
        <img src={iconUrl} alt={description} className="w-20 h-20 -mt-4 -mr-4" />
      </div>
      <div className="mt-6 text-6xl font-bold">
        {temp}°C
      </div>
    </div>
  );
}

export default WeatherDisplay;