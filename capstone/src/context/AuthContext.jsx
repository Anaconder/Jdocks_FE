import React, { createContext, useContext, useState } from 'react';


const DUMMY_USERS = [
  { id: 1, username: 'admin', password: 'admin', isAdmin: true },
  { id: 2, username: 'user', password: 'user', isAdmin: false },
];

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    const found = DUMMY_USERS.find(u => u.username === username && u.password === password);
    if (found) setUser(found);
    return !!found;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
