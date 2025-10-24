import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div className="flex space-x-4">
        <Link to="/">Home</Link>
        {user?.admin && <Link to="/inventory">Inventory</Link>}
        <Link to="/cart">Cart</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
      <div>
        {user ? (
          <>
            <span className="mr-4">{user.username}</span>
            <button onClick={logout} className="bg-red-500 px-2 py-1 rounded">Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
