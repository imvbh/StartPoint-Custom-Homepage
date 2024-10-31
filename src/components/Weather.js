import React, { useState, useEffect } from 'react';

function Weather() {
  const [temperature, setTemperature] = useState(null);
  const [city, setCity] = useState('');

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY&units=metric`
      );
      const data = await response.json();

      // Check if data.main exists before accessing temperature
      if (data.main && data.main.temp) {
        setTemperature(data.main.temp);
        setCity(data.name);
      } else {
        console.error('Weather data is unavailable:', data);
      }
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
    }
  };

  return (
    <div className="weather">
      {temperature ? (
        <p>Weather in {city}: {temperature}°C</p>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  );
}

export default Weather;
