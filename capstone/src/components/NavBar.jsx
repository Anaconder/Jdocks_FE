import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link className={location.pathname === "/" ? "active" : ""} to="/">Home</Link>
      <Link className={location.pathname === "/cart" ? "active" : ""} to="/carts">Cart</Link>
      <Link className={location.pathname === "/about" ? "active" : ""} to="/about">About Us</Link>
      <Link className={location.pathname === "/inventory" ? "active" : ""} to="/inventory">Inventory</Link>
    </nav>
  );
}
