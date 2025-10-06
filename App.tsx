import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CountryApp from "./components/CountryApp";
import CurrencyApp from "./components/CurrencyApp";
import MovieApp from "./components/MovieApp";
import MovieDetail from "./components/MovieDetail";

export default function App() {
  return (
    <Router>
      <nav style={{ padding: "1rem", background: "#eee" }}>
        <Link to="/">🌍 Quốc gia</Link> |{" "}
        <Link to="/currency">💰 Tỉ giá</Link> |{" "}
        <Link to="/movies">🎬 Phim</Link>
      </nav>
      <Routes>
        <Route path="/" element={<CountryApp />} />
        <Route path="/currency" element={<CurrencyApp />} />
        <Route path="/movies" element={<MovieApp />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
}
