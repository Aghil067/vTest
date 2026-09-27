import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/admin/authService';

interface User {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password?: string) => Promise<any>;
  logout: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem('vtest_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('vtest_token') || null;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      if (token) {
        try {
          const data = await authService.getMe();
          if (data.success && data.user) {
            setUser(data.user);
            localStorage.setItem('vtest_user', JSON.stringify(data.user));
          }
        } catch (err) {
          console.warn('Auth check fallback:', err);
        }
      }
      setLoading(false);
    };

    verifyAuth();
  }, [token]);

  const login = async (email: string, password?: string) => {
    const data = await authService.login({ email, password });
    if (data.success && data.token) {
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('vtest_token', data.token);
      localStorage.setItem('vtest_user', JSON.stringify(data.user));
    }
    return data;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch {
      // ignore
    } finally {
      setToken(null);
      setUser(null);
      localStorage.removeItem('vtest_token');
      localStorage.removeItem('vtest_user');
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
