import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEFAULT_USERS = [
  { username: 'admin', password: 'admin123', role: 'admin', name: 'Administrator RPL' },
  { username: 'siswa', password: 'siswa123', role: 'siswa', name: 'Siswa RPL' }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('tugasrpl_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (!localStorage.getItem('tugasrpl_registered_users')) {
      localStorage.setItem('tugasrpl_registered_users', JSON.stringify(DEFAULT_USERS));
    }
  }, []);

  const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem('tugasrpl_registered_users')) || DEFAULT_USERS;
    const found = users.find(u => u.username === username && u.password === password);
    
    if (found) {
      const userData = { username: found.username, role: found.role, name: found.name };
      setUser(userData);
      localStorage.setItem('tugasrpl_user', JSON.stringify(userData));
      return { success: true, user: userData };
    }
    return { success: false, message: 'Username atau password salah!' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tugasrpl_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
