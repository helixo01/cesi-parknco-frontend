import axios from 'axios';
import { API_URL } from '@/config/api';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  profilePicture?: string;
  formation?: string;
  specialite?: string;
  year?: string;
}

export const userService = {
  /**
   * Récupère les données de l'utilisateur connecté
   * @returns Promise<UserData> Les données de l'utilisateur
   */
  async getUserData(): Promise<UserData> {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Non connecté');
      }

      const response = await axios.get(`${API_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return {
        firstName: response.data.user.firstName,
        lastName: response.data.user.lastName,
        email: response.data.user.email,
        role: response.data.user.role,
        profilePicture: response.data.user.profilePicture,
        formation: response.data.user.formation,
        specialite: response.data.user.specialite,
        year: response.data.user.year
      };
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  /**
   * Récupère les données d'un utilisateur spécifique
   * @param userId L'ID de l'utilisateur à récupérer
   * @returns Promise<UserData> Les données de l'utilisateur
   */
  async getUserById(userId: string): Promise<{ firstName: string; lastName: string; profilePicture?: string }> {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Vous devez être connecté pour effectuer cette action');
      }

      const response = await axios.get(`${API_URL}/api/users/public/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return {
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        profilePicture: response.data.profilePicture
      };
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new Error('Utilisateur non trouvé');
      } else if (error.response?.status === 401) {
        throw new Error('Session expirée, veuillez vous reconnecter');
      } else if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('Erreur lors de la récupération des informations utilisateur');
      }
    }
  },

  /**
   * Met à jour les données de l'utilisateur
   * @param userData Les nouvelles données de l'utilisateur
   * @returns Promise<UserData> Les données mises à jour
   */
  async updateUserData(userData: Partial<UserData>): Promise<UserData> {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Non connecté');
      }

      const response = await axios.put(`${API_URL}/api/auth/me`, userData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return response.data.user;
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  /**
   * Met à jour la photo de profil de l'utilisateur
   * @param file Le fichier image à uploader
   * @returns Promise<string> L'URL de la nouvelle image
   */
  async updateProfilePicture(file: File): Promise<string> {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Non connecté');
      }

      const formData = new FormData();
      formData.append('profilePicture', file);

      const response = await axios.post(`${API_URL}/api/auth/profile-picture`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      return response.data.profilePicture;
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  }
};