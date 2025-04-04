import { useState, useEffect } from 'react';
import { API_URL } from '@/config/api';

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
}

export const useAuth = (): AuthState => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    loading: true,
    user: null
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setState({
            isAuthenticated: false,
            loading: false,
            user: null
          });
          return;
        }

        // Vérifier le token avec le backend
        const response = await fetch(`${API_URL}/api/auth/verify`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const userData = await response.json();
          setState({
            isAuthenticated: true,
            loading: false,
            user: userData.user
          });
        } else {
          localStorage.removeItem('token');
          setState({
            isAuthenticated: false,
            loading: false,
            user: null
          });
        }
      } catch (error) {
        localStorage.removeItem('token');
        setState({
          isAuthenticated: false,
          loading: false,
          user: null
        });
      }
    };

    checkAuth();
  }, []);

  return state;
};
