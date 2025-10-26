import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

export default function Favourites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  const toggleFavorite = (movie) => {
    const updated = favorites.filter((m) => m.imdbID !== movie.imdbID);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="favourites-page">
      <h1>Your Favourites</h1>
      {favorites.length === 0 ? (
        <p>No favourites yet. Add some from the Search page!</p>
      ) : (
        <div className="movie-grid">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onToggleFavorite={toggleFavorite}
              isFavorite={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
