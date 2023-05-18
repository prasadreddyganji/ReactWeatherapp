import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const API_KEY = 'YOURAPIKEY'; // Replace with your own API key

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
      setCity('');
    } catch (error) {
      console.error(error);
      setWeatherData(null);
      setCity('');
    }
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeatherData}>Get Weather</button>
      </div>
      {weatherData && weatherData.main && (
        <div className="weather-container">
          <h2>{weatherData.name}</h2>
          <div className="weather-info">
            <p className="temperature">{Math.round(weatherData.main.temp)}°C</p>
            <div className="weather-details">
              <p>Humidity: {weatherData.main.humidity}%</p>
              {weatherData.weather.length > 0 && (
                <p>Weather: {weatherData.weather[0].main}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

