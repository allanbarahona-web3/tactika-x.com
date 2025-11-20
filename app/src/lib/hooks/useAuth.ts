'use client';

import { useState, useCallback, useEffect } from 'react';
import { STORAGE_KEYS } from '@/src/lib/api/config';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Verificar si el usuario está autenticado al cargar
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const user = localStorage.getItem(STORAGE_KEYS.USER);
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

    if (user && token) {
      try {
        setState({
          user: JSON.parse(user),
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: 'Error loading user',
        });
      }
    } else {
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  }, []);

  const login = useCallback(
    async (email: string) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        // TODO: Llamar al endpoint de login del backend
        // const response = await apiClient.post('/auth/login', { email, password });
        
        // Por ahora, simular login
        const mockUser: User = {
          id: '1',
          email,
          name: email.split('@')[0],
          role: 'user',
        };

        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(mockUser));
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, 'mock-token');

        setState({
          user: mockUser,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });

        return mockUser;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Login failed';
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }));
        throw error;
      }
    },
    []
  );

  const logout = useCallback(() => {
    // TODO: Llamar al endpoint de logout del backend
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);

    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  }, []);

  const register = useCallback(
    async (email: string, name: string) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        // TODO: Llamar al endpoint de registro del backend
        // const response = await apiClient.post('/auth/register', { email, password, name });

        const mockUser: User = {
          id: '1',
          email,
          name,
          role: 'user',
        };

        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(mockUser));
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, 'mock-token');

        setState({
          user: mockUser,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });

        return mockUser;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Registration failed';
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }));
        throw error;
      }
    },
    []
  );

  return {
    ...state,
    login,
    logout,
    register,
  };
}
