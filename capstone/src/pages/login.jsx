import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    const ok = await login({ username, password });
    if (ok) navigate('/');
    else setError('Invalid credentials');
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <input required value={username} onChange={(e) => setUsername(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="username" />
        <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="password" />
        {error && <div className="text-red-600">{error}</div>}
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Sign in</button>
      </form>
      <div className="mt-3 text-sm text-gray-500">Seeded admin: jane_admin / password123 (if you used your seed)</div>
    </div>
  );
}
