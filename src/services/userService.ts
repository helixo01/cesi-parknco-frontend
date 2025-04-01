import axios from 'axios';
import { API_URL } from '@/config/api';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export const userService = {
  /**
   * Récupère les données de l'utilisateur connecté
   * @returns Promise<UserData> Les données de l'utilisateur
   */
  async getUserData(): Promise<UserData> {
    try {
      // Récupère le token du localStorage
      const token = localStorage.getItem('token');
      console.log('Token trouvé:', token);

      if (!token) {
        throw new Error('Non connecté');
      }

      console.log('Appel API avec token...');
      // Appel à l'API avec le token
      const response = await axios.get(`${API_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Réponse API:', response.data);

      // Retourne les données utilisateur
      return {
        firstName: response.data.user.firstName,
        lastName: response.data.user.lastName,
        email: response.data.user.email,
        role: response.data.user.role
      };
    } catch (error) {
      console.error('Erreur complète:', error);
      throw error;
    }
  }
}; 