// src/app/providers/AuthProvider.tsx
'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { User } from '../../types/auth';
import { RegisterData, LoginData } from '../../types/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { login, register, ...rest } = useAuth();

  // Wrap login and register to return void
  const handleLogin = async (data: LoginData) => {
    await login(data);
  };

  const handleRegister = async (data: RegisterData) => {
    await register(data);
  };

  return (
    <AuthContext.Provider
      value={{
        ...rest,
        login: handleLogin,
        register: handleRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}