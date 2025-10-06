import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

interface MovieDetail {
  Title: string;
  Year: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  Poster: string;
}

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetail | null>(null);

  useEffect(() => {
    axios
      .get(`https://www.omdbapi.com/?apikey=thewdb&i=${id}&plot=full`)
      .then(res => setMovie(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!movie) return <p>Đang tải...</p>;

  return (
    <div style={{ padding: 20 }}>
      <Link to="/movies">⬅ Quay lại</Link>
      <h2>{movie.Title}</h2>
      <img src={movie.Poster} alt={movie.Title} width="200" />
      <p><b>Năm:</b> {movie.Year}</p>
      <p><b>Thể loại:</b> {movie.Genre}</p>
      <p><b>Đạo diễn:</b> {movie.Director}</p>
      <p><b>Diễn viên:</b> {movie.Actors}</p>
      <p><b>Tóm tắt:</b> {movie.Plot}</p>
    </div>
  );
}
