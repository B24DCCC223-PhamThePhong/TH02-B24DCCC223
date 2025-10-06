import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export default function MovieApp() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);

  const searchMovies = async () => {
    try {
      const res = await axios.get(`https://www.omdbapi.com/?apikey=thewdb&s=${query}`);
      setMovies(res.data.Search || []);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🎬 Tìm kiếm Phim</h2>
      <input
        type="text"
        placeholder="Nhập tên phim..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button onClick={searchMovies}>Tìm</button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 20,
          marginTop: 20
        }}
      >
        {movies.map(movie => (
          <div key={movie.imdbID} style={{ border: "1px solid #ddd", padding: 10, borderRadius: 8 }}>
            <img src={movie.Poster} alt={movie.Title} width="100%" />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
            <Link to={`/movies/${movie.imdbID}`}>Chi tiết</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
