import { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '@/config/api';

interface User {
  id: string;
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
        // Vérifier le token avec le backend
        const response = await fetch(API_ENDPOINTS.AUTH.VERIFY, {
          credentials: 'include', // Important pour les cookies
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setState({
            isAuthenticated: true,
            loading: false,
            user: userData.user
          });
        } else {
          setState({
            isAuthenticated: false,
            loading: false,
            user: null
          });
        }
      } catch (error) {
        console.error('Erreur de vérification d\'authentification:', error);
        setState({
          isAuthenticated: false,
          loading: false,
          user: null
        });
      }
    };

    checkAuth();
  }, []); // On ne dépend plus du pathname

  return state;
};
