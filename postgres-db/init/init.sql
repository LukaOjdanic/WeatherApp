-- Main table for storing weather search history
CREATE TABLE IF NOT EXISTS weather_searches (
    id SERIAL PRIMARY KEY,
    city_name VARCHAR(255) NOT NULL,
    temperature REAL,
    description VARCHAR(255),
    icon_code VARCHAR(10),
    weather_api_timestamp TIMESTAMPTZ,
    searched_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_city_name ON weather_searches (city_name);
CREATE INDEX IF NOT EXISTS idx_searched_at ON weather_searches (searched_at DESC);

INSERT INTO weather_searches (city_name, temperature, description) VALUES ('Initial City', 15.5, 'clear sky');