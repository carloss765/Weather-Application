import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = () => {
    const [weather, setWeather] = useState(null)
    const apiKey = '8bd122c68c6a4b54b5d175055252501';
    const [city, setCity] = useState('Pereira'); // Replace YOUR_CITY with your city
    const [inputCity, setInputCity] = useState('Pereira'); // Replace YOUR_CITY with your city
    const [error, setError] = useState(null);

    useEffect(() => {
        if (city) {
            axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
                .then(response => {
                    console.log(response.data); // Check the response data in the console
                    setWeather(response.data);
                    setError(null);
                })
                .catch(error => {
                    console.error('There was an error!', error);
                    setError(error);
                    setWeather(null);
                });
        }
    }, [city]);

    const handleInputChange = (event) => {
        setInputCity(event.target.value);
    };
    const handleFormSubmit = (event) => {
        event.preventDefault(); // Prevent the page from reloading
        setCity(inputCity);
    };

    if (error) return <p>Error: {error.message}</p>
    if (!weather) return <p>Loading...</p>

    return (
        <div>
            <h1>Clima en {weather.location.name}</h1>
            <p>Temperature {weather.current.temp_c}°C</p>
            <p>Condition {weather.current.condition.text}</p>
            <img src={weather.current.condition.icon} alt="Weather icon" />
            <form onSubmit={handleFormSubmit}>
                <input value={inputCity} type="text" placeholder="City" onChange={handleInputChange} />
                <button type='submit'>Search</button>
            </form>
        </div>

    );
};

export default Weather;