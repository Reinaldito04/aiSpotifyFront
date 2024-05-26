import { useState, useEffect } from "react";
import Card from "./Card";
import "./styles/Music.css";
import axios from "axios";

function Music() {
  const [sounds, setSounds] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Estado para manejar la carga inicial
  const [isButtonLoading, setIsButtonLoading] = useState(false); // Estado para manejar la carga del botón
  const [authorizationCode, setAuthorizationCode] = useState(null);

  const fetchInitialSongs = async (code) => {
    if (code) {
      setIsLoading(true);
      try {
        const url = `https://6jjvf5b7-8000.use2.devtunnels.ms/callback/?code=${code}`;
        const response = await axios.get(url);
        console.log("Canciones obtenidas:", response.data);
        setSounds(response.data.songs_with_images);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al obtener las canciones:", error);
        setIsLoading(false);
      }
    } else {
      console.error("No se encontró el código de autorización en la URL.");
      setIsLoading(false);
    }
  };

  const fetchMoreSongs = async () => {
    if (authorizationCode) {
      setIsButtonLoading(true);
      try {
        const url = `https://6jjvf5b7-8000.use2.devtunnels.ms/callback/?code=${authorizationCode}`;
        const response = await axios.get(url);
        console.log("Más canciones obtenidas:", response.data);
        setSounds((prevSounds) => [...prevSounds, ...response.data.songs_with_images]);
        setIsButtonLoading(false);
      } catch (error) {
        console.error("Error al obtener más canciones:", error);
        setIsButtonLoading(false);
      }
    }
  };

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (code) {
      setAuthorizationCode(code);
      fetchInitialSongs(code); // Cargar las primeras canciones al montar el componente
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <section className="sectionRecomendations">
      <div className="music-container">
        <h4 className="text-center title">Canciones Recomendadas</h4>
        <p className="text-center subtitle">
          Estamos obteniendo una lista de canciones recomendadas para ti. Esto
          puede tomar unos momentos, así que por favor ten paciencia mientras
          cargamos la información.
        </p>
        {isLoading && sounds.length === 0 ? (
          <p className="loading-text">Cargando canciones...</p> // Indicador de carga inicial
        ) : (
          <div className="cards-container">
            {sounds.map((song, index) => (
              <div className="col-md-6" key={index}>
                <Card key={index} song={song} />
              </div>
            ))}
          </div>
        )}
        {sounds.length > 0 && (
          <div>
            <div className="container-boton">
              <button className="botonSong" onClick={fetchMoreSongs} disabled={isButtonLoading}>
                {isButtonLoading ? "Cargando más canciones..." : "Cargar más canciones"}
              </button>
            </div>
            {isButtonLoading && <p className="loading-text">Cargando más canciones...</p>} {/* Indicador de carga al final */}
          </div>
        )}
      </div>
    </section>
  );
}

export default Music;
