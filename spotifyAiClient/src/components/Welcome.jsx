import "./styles/Welcome.css";
import Footer from "./Footer";
import { FaSpotify } from "react-icons/fa6";


import axios from "axios";
function Welcome() {
  const authorizeSpotify = async () => {
    const url = "https://6jjvf5b7-8000.use2.devtunnels.ms/search/1";
    try {
      const response = await axios.get(url);
      console.log("Redireccionando a la URL de autorización de Spotify...");


      window.location.href = response.data.authorization_url ;
      
      
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };
  return (
    <section className="container-fluid sectionWelcome">
      <div className="container-fluid contenedorPrincipal">
        <h1>Bienvenido a</h1>
        <h3>*nombre aun no*</h3>
        <button className="  botonSpotify" onClick={authorizeSpotify}>
        
            Ingresar Con Spotify{" "}
            <strong>
              <FaSpotify />
            </strong>{" "}
        
        </button>
      </div>

      <Footer />
    </section>
  );
}

export default Welcome;
