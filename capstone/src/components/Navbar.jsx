import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { state } = useStore();
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="flex space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        {user?.isAdmin && <Link to="/inventory" className="hover:underline">Inventory</Link>}
        <Link to="/cart" className="hover:underline">Cart ({state.cart.length})</Link>
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
      </div>
      <div>
        {user ? (
          <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
        ) : (
          <Link to="/login" className="bg-green-500 px-3 py-1 rounded">Login</Link>
        )}
      </div>
    </nav>
  );
}
