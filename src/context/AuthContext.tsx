import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

interface User {
  name: string;
  cpf: string;
  tipo_usuario: number;
}

interface AuthContextData {
  user: User | null;
  token: string | null;
  loading: boolean;
  signIn(credentials: { cpf: string; password: string }): Promise<void>;
  signOut(): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storagedToken = await AsyncStorage.getItem('@App:token');
      const storagedUser = await AsyncStorage.getItem('@App:user');

      if (storagedToken && storagedUser) {
        api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
        setToken(storagedToken);
        setUser(JSON.parse(storagedUser));
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = async ({ cpf, password }: { cpf: string; password: string }) => {
    const response = await api.post<any>('/login', { cpf, password });
    console.log(response)
    const { token: token } = response.data;
    const { nome, cpf: cpfr, tipo_usuario } = response.data.sessionData;
    const userData: User = {
      name: nome,
      cpf: cpfr,
      tipo_usuario: tipo_usuario
    }

    setUser(userData);
    setToken(token);
    api.defaults.headers.Authorization = `Bearer ${token}`;

    await AsyncStorage.setItem('@App:token', token);
    await AsyncStorage.setItem('@App:user', JSON.stringify(userData));
  };

  const signOut = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem('@App:token');
    await AsyncStorage.removeItem('@App:user');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

