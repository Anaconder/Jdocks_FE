import React from "react";
import "../styles/MovieCard.css";

function MovieCard({ movie, isFavorite, onToggleFavorite }) {

  return (
    <div className="movie-card">
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/200x300?text=No+Image"}
        alt={movie.Title}
      />
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
      <button
        onClick={() => onToggleFavorite && onToggleFavorite(movie)}
        className={isFavorite ? "favorite active" : "favorite"}
      >
      {isFavorite ? "❤️ Remove Favorite" : "🤍 Add Favorite"}
      </button>
    </div>
  );
}

export default MovieCard;
