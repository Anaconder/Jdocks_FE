import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";

function Search() {
  const [query, setQuery] = useState("Avengers");
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  useEffect(() => {
    // Fetch data from OMDB API
    fetch(`https://www.omdbapi.com/?s=${query}&apikey=ed86d8ec`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Search) setMovies(data.Search);
        else setMovies([]);
      });
  }, [query]);

  // Toggle movie in/out of favorites
  const toggleFavorite = (movie) => {
    const isAlreadyFav = favorites.some((m) => m.imdbID === movie.imdbID);
    let updated;

    if (isAlreadyFav) {
      updated = favorites.filter((m) => m.imdbID !== movie.imdbID);
    } else {
      updated = [...favorites, movie];
    }

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="page">
      <h2>Search Movies</h2>
      <SearchBar onSearch={setQuery} />

      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onToggleFavorite={toggleFavorite}
            isFavorite={favorites.some((m) => m.imdbID === movie.imdbID)}
          />
        ))}
      </div>
    </div>
  );
}

export default Search;
