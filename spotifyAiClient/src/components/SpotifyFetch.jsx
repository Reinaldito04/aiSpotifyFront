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
