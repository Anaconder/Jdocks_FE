import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">putJdocks_logo_here</h1>
      <div className="nav-links">
        <Link to="/">Login</Link>
        <Link to="/search">Dashboard</Link>
        <Link to="/home">Home</Link>
        <Link to="/inventory">Inventory</Link>
      </div>
    </nav>
  );
}

export default Navbar;
