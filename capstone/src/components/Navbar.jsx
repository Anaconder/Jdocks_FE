import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { state } = useStore();
  const cartCount = state.cart.reduce((s, c) => s + (c.qty || 0), 0);
  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Link to="/" className="font-bold text-lg">GPT-4 Shop</Link>
        <Link to="/" className="text-sm text-gray-600">Home</Link>
        <Link to="/inventory" className="text-sm text-gray-600">Inventory</Link>
        <Link to="/dashboard" className="text-sm text-gray-600">Dashboard</Link>
      </div>
      <div className="flex items-center gap-4">
        <Link to="/cart" className="relative">
          Cart
          <span className="ml-1 inline-block bg-gray-200 rounded-full px-2 text-xs">{cartCount}</span>
        </Link>
        {user ? (
          <div className="flex items-center gap-2">
            <div className="text-sm">{user.username}{user.isAdmin ? ' (admin)' : ''}</div>
            <button onClick={logout} className="px-3 py-1 border rounded">Logout</button>
          </div>
        ) : (
          <Link to="/login" className="px-3 py-1 border rounded">Login</Link>
        )}
      </div>
    </nav>
  );
}
