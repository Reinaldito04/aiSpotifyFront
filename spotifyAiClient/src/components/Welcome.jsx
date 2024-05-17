import "./styles/Welcome.css";
import Footer from "./Footer";
import { FaSpotify } from "react-icons/fa6";
function Welcome() {
  return (
    <section className="container-fluid sectionWelcome">
      <div className="container-fluid contenedorPrincipal">
        <h1>Bienvenido a</h1>
        <h3>*nombre aun no*</h3>
        <button className="  botonSpotify">
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
