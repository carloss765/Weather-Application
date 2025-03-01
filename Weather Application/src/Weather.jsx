import { useEffect, useState } from "react";
import axios from "axios";
import "./Weather.css";
import "@fontsource/roboto/300.css";
import CircularProgress from "@mui/material/CircularProgress";
import Skeleton from "@mui/material/Skeleton";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const apiKey = "8bd122c68c6a4b54b5d175055252501";
  const [city, setCity] = useState("Pereira");
  const [inputCity, setInputCity] = useState("Pereira");
  const [error, setError] = useState(null);
  // Lista de ciudades para sugerencias
  const [suggestions, setSuggestions] = useState([]);
  // Lista estática de ciudades populares (puedes ampliarla)
  const popularCities = [
    // Ciudades de Colombia
    "Bogotá",
    "Medellín",
    "Cali",
    "Barranquilla",
    "Cartagena",
    "Pereira",
    "Bucaramanga",
    "Manizales",
    "Santa Marta",
    "Cúcuta",
    "Ibagué",
    "Pasto",
    "Villavicencio",
    "Armenia",
    "Neiva",
    "Popayán",
    // Ciudades internacionales grandes
    "Madrid",
    "Barcelona",
    "Londres",
    "Nueva York",
    "París",
    "Tokio",
    "Berlín",
    "Roma",
    "Ámsterdam",
    "Ciudad de México",
    "Buenos Aires",
    "Río de Janeiro",
    "Sao Paulo",
    "Lima",
    "Santiago",
    "Toronto",
    "Sídney",
    "Moscú",
    "Dubái",
    "Estambul",
  ];
  // Estado para mostrar u ocultar el dropdown
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (city) {
      axios
        .get(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
        )
        .then((response) => {
          console.log(response.data);
          setWeather(response.data);
          setError(null);
        })
        .catch((error) => {
          console.error("There was an error!", error);
          setError(error);
          setWeather(null);
        });
    }
  }, [city]);

  // Filtrar sugerencias basadas en la entrada del usuario
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputCity(value);

    if (value.length > 0) {
      // Filtrar ciudades que coincidan con lo que escribe el usuario
      const filteredSuggestions = popularCities.filter((city) =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Seleccionar una sugerencia del dropdown
  const handleSuggestionClick = (suggestion) => {
    setInputCity(suggestion);
    setShowSuggestions(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setCity(inputCity);
    setShowSuggestions(false);
  };

  // Cerrar sugerencias al hacer clic fuera del dropdown
  const handleBlur = () => {
    // Pequeño retraso para permitir que el clic en la sugerencia funcione
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  if (error) return <p>Error: {error.message}</p>;
  if (!weather) {
    return (
      <div className="weather">
        <CircularProgress />
        <Skeleton
          variant="text"
          sx={{ fontSize: "1rem" }}
        />
        <Skeleton
          variant="rounded"
          width={210}
          height={60}
        />
        <Skeleton
          variant="rounded"
          width={210}
          height={60}
        />
      </div>
    );
  }

  return (
    <div className="weather">
      <div className="Div">
        <h1 className="subTitle">Weather in {weather.location.name}</h1>
        <p className="temperature">Temperature: {weather.current.temp_c}°C</p>
        <p className="condition">Condition: {weather.current.condition.text}</p>
        <img
          src={weather.current.condition.icon}
          alt="Weather icon"
        />
        <form onSubmit={handleFormSubmit}>
          <div className="search-container">
            <input
              value={inputCity}
              type="text"
              placeholder="Ciudad"
              onChange={handleInputChange}
              onFocus={() => inputCity.length > 0 && setShowSuggestions(true)}
              onBlur={handleBlur}
              autoComplete="off"
            />
            {showSuggestions && suggestions.length > 0 && (
              <div className="suggestions-dropdown">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
            <button type="submit">Buscar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Weather;
