import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Recomendations from "./pages/Recomendations";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recomendations" element={<Recomendations />} />
      </Routes>
    </Router>
  );
}

export default App;
