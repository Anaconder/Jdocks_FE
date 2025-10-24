// src/pages/Login.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { apiPost } from '../utils/api.js';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [err, setErr] = useState(null);

  // If your backend supports auth: call POST /auth/login
  // For now we try backend login and fall back to simulated login
  async function handleSubmit(e) {
    e.preventDefault();
    setErr(null);
    try {
      // Try backend login (optional)
      const resp = await apiPost('/auth/login', { username, password }).catch(() => null);
      if (resp && resp.user) {
        login(resp.user); // expects server returns { user: { username, admin, ... } }
        navigate('/');
        return;
      }
      // Fallback: simple local login (simulate)
      // admin username could be 'jane_admin' from your seed, but adapt as needed
      if ((username === 'jane_admin' && password === 'password123') || (username === 'admin' && password === 'admin')) {
        login({ username, admin: true });
        navigate('/');
        return;
      }
      if ((username === 'john_doe' && password === 'password123') || (username === 'user' && password === 'user')) {
        login({ username, admin: false });
        navigate('/');
        return;
      }
      setErr('Invalid credentials');
    } catch (err) {
      console.error(err);
      setErr('Login failed');
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Login</h2>
      {err && <div className="text-red-600 mb-2">{err}</div>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" className="w-full border px-2 py-1 rounded" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" className="w-full border px-2 py-1 rounded" />
        <div>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Sign in</button>
        </div>
      </form>
      <div className="text-sm text-gray-500 mt-3">Tip: seed usernames from your seed script. Example: jane_admin/password123</div>
    </div>
  );
}
