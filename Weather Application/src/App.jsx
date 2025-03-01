import { useState } from "react";
import Weather from "./Weather";
import "./App.css";

const App = () => {
  // Estado para la animación del nav
  const [hovered, setHovered] = useState(false);

  // Función para redirigir al perfil de GitHub
  const redirectToGitHub = () => {
    window.open(
      "https://github.com/carloss765",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="App">
      {/* Barra de navegación con información del desarrollador */}
      <nav
        className={`developer-nav ${hovered ? "hovered" : ""}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="nav-content">
          <h2 className="app-title">Weather App</h2>
          <div className="developer-info">
            <span className="dev-text">Desarrollado con ❤️ por</span>
            <a
              href="https://github.com/carloss765"
              target="_blank"
              rel="noopener noreferrer"
              className="github-link"
              onClick={(e) => {
                e.preventDefault();
                redirectToGitHub();
              }}
            >
              Carlos <i className="github-icon">✦</i>
            </a>
          </div>
        </div>
      </nav>

      <div className="main-content">
        <h1 className="h1">Weather Application</h1>
        <Weather />
      </div>
    </div>
  );
};

export default App;
