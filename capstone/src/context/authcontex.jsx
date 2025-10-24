import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  async function loginWithServer(credentials) {
    try {
      const res = await api.post('/auth/login', credentials);
      if (res?.data?.user) {
        setUser(res.data.user);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  // fallback/simulated login
  function simulateLogin(username, password) {
    // quick simulation for development; you can remove in production
    if ((username === 'admin' && password === 'admin') || username === 'jane_admin') {
      setUser({ username, isAdmin: true });
      return true;
    }
    if ((username === 'user' && password === 'user') || username === 'john_doe') {
      setUser({ username, isAdmin: false });
      return true;
    }
    return false;
  }

  async function login({ username, password }) {
    // try server first, else simulate
    const ok = await loginWithServer({ username, password }).catch(() => false);
    if (ok) return true;
    return simulateLogin(username, password);
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('user');
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
