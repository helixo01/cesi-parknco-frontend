import { API_URL } from '@/config/api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

interface RegisterData {
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la connexion');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    return data;
  },

  register: async (userData: RegisterData) => {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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

  logout: () => {
    localStorage.removeItem('token');
  },
};