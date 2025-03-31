import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = 'http://localhost:5000/api/auth';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      console.log('Tentative de connexion avec:', credentials.email);
      const response = await axios.post(`${API_URL}/login`, credentials);
      console.log('Réponse du serveur:', response.data);
      
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      return { token, user };
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw new Error('Failed to login');
    }
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    try {
      console.log('Tentative d\'inscription avec:', credentials.email);
      const response = await axios.post(`${API_URL}/register`, credentials);
      console.log('Réponse du serveur:', response.data);
      
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      return { token, user };
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      throw new Error('Failed to register');
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getCurrentUser: () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      return jwtDecode(token);
    } catch {
      return null;
    }
  },

  isAuthenticated: (): boolean => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    try {
      const decoded = jwtDecode(token);
      return true;
    } catch {
      return false;
    }
  },
};