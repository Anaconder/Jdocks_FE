import { Link } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>Capstone Dashboard</h2>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/users">Users</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/carts">Carts</Link>
      </div>
    </nav>
  );
}
