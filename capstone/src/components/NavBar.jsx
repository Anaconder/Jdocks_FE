import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/carts">Carts</Link>
      <Link to="/about">About Us</Link>
      <Link to="/inventory">Inventory</Link>
    </nav>
  );
}
