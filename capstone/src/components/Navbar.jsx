import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">🎬 Movie Discovery</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/favourites">favourites</Link>
      </div>
    </nav>
  );
}

export default Navbar;
