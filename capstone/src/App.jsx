import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { StoreProvider } from './context/StoreContext';
import Navbar from './components/Navbar';
import AdminRoute from './components/AdminRoute';

import Home from './pages/Home';
import Inventory from './pages/Inventory';
import Cart from './pages/Cart';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <StoreProvider>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/inventory" element={<AdminRoute adminOnly><Inventory /></AdminRoute>} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<div className="p-6">Page not found</div>} />
            </Routes>
          </div>
        </StoreProvider>
      </AuthProvider>
    </Router>
  );
}
