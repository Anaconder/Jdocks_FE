import React, { createContext, useContext, useState } from 'react';

// Create context
const AuthContext = createContext();

// Provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null = not logged in

  const login = ({ username, isAdmin }) => {
    setUser({ username, isAdmin });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use in components
export function useAuth() {
  return useContext(AuthContext);
}
