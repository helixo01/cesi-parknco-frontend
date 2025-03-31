import axios from 'axios';
import { authService } from './auth';

const API_URL = 'http://localhost:5000/api/auth';

interface UserData {
  prenom: string;
  nom: string;
  email: string;
  // Autres données utilisateur à ajouter plus tard
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
      const response = await axios.get(`${API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Réponse API:', response.data);

      // On utilise le champ 'name' qui contient le nom complet
      const nomComplet = response.data.name ? response.data.name.split(' ') : [''];
      const prenom = nomComplet[0];

      // Retourne les données utilisateur
      return {
        prenom: prenom,
        nom: nomComplet.slice(1).join(' '),
        email: response.data.email
      };
    } catch (error) {
      console.error('Erreur complète:', error);
      throw error;
    }
  }
}; 