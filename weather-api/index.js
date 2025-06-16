const express = require('express');
const fetch = require('node-fetch'); // Or import axios
const { Pool } = require('pg'); // PostgreSQL client
const app = express();
const port = 3000; // Must match EXPOSE in Dockerfile & Nginx proxy_pass

// PostgreSQL connection setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // From docker-compose environment
});

app.use(express.json()); // Middleware to parse JSON bodies

// Basic route
app.get('/', (req, res) => {
  res.send('Weather API Service is running!');
});

// Endpoint to get weather and store search
app.get('/weather/:city', async (req, res) => {
  const { city } = req.params;
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const openWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const weatherResponse = await fetch(openWeatherURL);
    const weatherData = await weatherResponse.json();

    if (weatherResponse.ok) {
      // Store search in database (example)
      const { name, main, weather, dt } = weatherData;
      const insertQuery = `
        INSERT INTO weather_searches (city_name, temperature, description, icon_code, weather_api_timestamp, searched_at)
        VALUES ($1, $2, $3, $4, to_timestamp($5), NOW())
        RETURNING *;
      `;
      // Note: Ensure 'weather_searches' table exists with these columns
      const dbResult = await pool.query(insertQuery, [
        name,
        main.temp,
        weather[0].description,
        weather[0].icon,
        dt
      ]);

      res.json({ current_weather: weatherData, saved_search: dbResult.rows[0] });
    } else {
      res.status(weatherData.cod || 500).json({ message: weatherData.message || "Error fetching weather data" });
    }
  } catch (error) {
    console.error('Error in /weather/:city endpoint:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Weather API listening on port ${port}`);
});
