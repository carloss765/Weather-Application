import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Weather.css';
import '@fontsource/roboto/300.css';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';

const Weather = () => {
    const [weather, setWeather] = useState(null);
    const apiKey = '8bd122c68c6a4b54b5d175055252501';
    const [city, setCity] = useState('Pereira');
    const [inputCity, setInputCity] = useState('Pereira');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (city) {
            axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
                .then(response => {
                    console.log(response.data);
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
        event.preventDefault();
        setCity(inputCity);
    };

    if (error) return <p>Error: {error.message}</p>;
    if (!weather) {
        return (
            <div className="weather">
                <CircularProgress />
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                <Skeleton variant="rounded" width={210} height={60} />
                <Skeleton variant="rounded" width={210} height={60} />
            </div>
        );
    }

    return (
        <div className="weather">
            <div className="Div">
                <h1 className="subTitle">Weather in {weather.location.name}</h1>
                <p className="temperature">Temperature: {weather.current.temp_c}°C</p>
                <p className="condition">Condition: {weather.current.condition.text}</p>
                <img src={weather.current.condition.icon} alt="Weather icon" />
                <form onSubmit={handleFormSubmit}>
                    <input
                        value={inputCity}
                        type="text"
                        placeholder="City"
                        onChange={handleInputChange}
                    />
                    <button type="submit">Search</button>
                </form>
            </div>
        </div>
    );
};

export default Weather;