// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { AuthResponse, LoginData, RegisterData, User } from '../types/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Inicia como true para a verificação inicial
  const [error, setError] = useState<string | null>(null);

  // Verifica o token ao carregar
  useEffect(() => {
    const loadUserFromToken = async () => {
      const token = localStorage.getItem('token');
      console.log('Token found:', token);
      if (token) {
        try {
          setLoading(true);
          // Adicione um endpoint no seu backend para validar o token e retornar os dados do usuário
          const response = await api.get<User>('/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
          console.log('User loaded from token:', response.data);
        } catch (err) {
          //localStorage.removeItem('token');
          setUser(null);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    loadUserFromToken();
  }, []);

  const login = async (data: LoginData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post<AuthResponse>('/auth/login', data);
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post<AuthResponse>('/auth/register', data);
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return { user, loading, error, login, register, logout };
}