import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const apiKey = 'b09d639ec082635781ef5512fe9e94fc';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios
        .get(apiUrl)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error);
          setData({});
        });
      setLocation('');
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p> {/* Display the city name */}
          </div>
          <div className="temp">
            {data.main && data.main.temp
              ? `${(data.main.temp - 273.15).toFixed(1)}°C`
              : ''}{' '}
            {/* Convert Kelvin to Celsius */}
          </div>
          <div className="description">
            <p>{data.weather && data.weather[0].main}</p> {/* Display weather description */}
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            <p className="bold">
              {data.main && data.main.feels_like
                ? `${(data.main.feels_like - 273.15).toFixed(1)}°C`
                : ''}
            </p>
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            <p className="bold">{data.main && data.main.humidity ? `${data.main.humidity}%` : ''}</p>
            <p>Humidity</p>
          </div>
          <div className="wind">
            <p className="bold">
              {data.wind && data.wind.speed ? `${data.wind.speed} m/s` : ''}
            </p>
            <p>Wind</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
