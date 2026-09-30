import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../api/client';

const AuthContext = createContext(null);

function readStoredValue(key) {
  if (typeof window === 'undefined') return null;
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStoredValue('fasat-admin-user'));
  const [token, setToken] = useState(() => window.localStorage.getItem('fasat-admin-token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    api
      .getAdminMe()
      .then((data) => {
        setUser(data.user || data);
        setLoading(false);
      })
      .catch(() => {
        window.localStorage.removeItem('fasat-admin-token');
        window.localStorage.removeItem('fasat-admin-user');
        setUser(null);
        setToken(null);
        setLoading(false);
      });
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await api.loginAdmin({ email, password });
      const authToken = data.token;
      const authUser = data.user || { email };

      if (authToken) {
        window.localStorage.setItem('fasat-admin-token', authToken);
        window.localStorage.setItem('fasat-admin-user', JSON.stringify(authUser));
        setToken(authToken);
        setUser(authUser);
        return data;
      }

      throw new Error('No auth token returned');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    window.localStorage.removeItem('fasat-admin-token');
    window.localStorage.removeItem('fasat-admin-user');
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, token, loading, login, logout }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside an AuthProvider');
  return context;
}
