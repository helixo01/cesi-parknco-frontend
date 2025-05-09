import { API_ENDPOINTS } from '@/config/api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
}

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'user' | 'admin_user' | 'admin_tech';
  profilePicture?: string;
  // ... autres champs de l'utilisateur
}

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la connexion');
    }

    return await response.json();
  },

  register: async (userData: RegisterData) => {
    const response = await fetch(API_ENDPOINTS.AUTH.REGISTER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        firstName: userData.prenom,
        lastName: userData.nom,
        email: userData.email,
        password: userData.motDePasse,
      }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'inscription');
    }

    return await response.json();
  },

  logout: async () => {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.LOGOUT, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la déconnexion');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      throw error;
    }
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await fetch(API_ENDPOINTS.AUTH.ME, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération de l\'utilisateur');
    }

    const data = await response.json();
    return data.user || data;
  },
};