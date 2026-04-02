import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ _id: '1', name: 'Demo User', email: 'demo@example.com', skillsToTeach: ['React'], skillsToLearn: ['Node.js'] });
  const [token, setToken] = useState('dummy-token');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  const loadUser = async () => {
    setLoading(false);
  };

  const login = async (email, password) => {
    const mockUser = { _id: '1', name: 'Demo User', email, skillsToTeach: ['React'], skillsToLearn: ['Node.js'] };
    setUser(mockUser);
    setToken('dummy-token');
    return mockUser;
  };

  const signup = async (email, password, name) => {
    const response = await api.post('/auth/signup', { email, password, name });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    setToken(token);
    setUser(user);
    return user;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    login,
    signup,
    logout,
    refreshUser: loadUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};