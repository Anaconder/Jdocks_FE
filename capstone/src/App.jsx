import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import Home from './pages/Home.jsx';
import Inventory from './pages/Inventory.jsx';
import Cart from './pages/Cart.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/inventory"
            element={
              <AdminRoute adminOnly={true}>
                <Inventory />
              </AdminRoute>
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<div className="p-6">Page not found</div>} />
        </Routes>
      </div>
    </Router>
  );
}
