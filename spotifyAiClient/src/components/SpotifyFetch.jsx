import axios from "axios";
import { useState, useEffect } from "react";
function SpotifyFetch() {
  const [sound, setSounds] = useState([]);
  const [hasFetchedSongs, setHasFetchedSongs] = useState(false);

  const authorizeSpotify = async () => {
    const url = "http://localhost:8000/search/1";
    try {
      const response = await axios.get(url);
      console.log("Redireccionando a la URL de autorización de Spotify...");
      window.location.href = response.data.authorization_url; // Redirige al usuario a la URL de autorización
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  const fetchSongs = async () => {
    // Extraer el código de autorización de la URL actual
    const authorizationCode = new URLSearchParams(window.location.search).get(
      "code"
    );
    if (authorizationCode && !hasFetchedSongs) {
      try {
        // Hacer una solicitud con el código de autorización para obtener las canciones
        const url = `http://localhost:8000/callback/?code=${authorizationCode}`;
        const response = await axios.get(url);
        console.log(response.data);
        console.log("Canciones obtenidas:", response.data);
        setSounds(response.data.songs_with_images);

        setHasFetchedSongs(true); // Marcar que las canciones ya han sido obtenidas
        // Aquí puedes manejar las canciones obtenidas
      } catch (error) {
        console.error("Error al obtener las canciones:", error);
      }
    } else if (!authorizationCode) {
      console.error("No se encontró el código de autorización en la URL.");
    }
  };

  // Llamar a la función para obtener las canciones cuando se cargue el componente
  useEffect(() => {
    fetchSongs();
  }, []); // Esto asegura que se llame solo una vez cuando se monta el componente

  return (
    <>
      {" "}
      <button onClick={authorizeSpotify}>Ingresar</button>
      <br />
      <h2>Canciones Recomendadas</h2>
      <ul>
        {sound
          .filter((song) => song.name.trim() !== "") // Filtrar elementos con name no vacío
          .map((song, index) => (
            <li key={index}>
              <img src={song.image_url} alt={song.name} />
              <br />
              {song.name} - {song.artist}
              <p>{song.song_url}</p>
            </li>
          ))}
      </ul>
    </>
  );
}

export default SpotifyFetch;
