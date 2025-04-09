import { API_URL, AUTH_API_URL, IMAGES_URL, API_ENDPOINTS } from '@/config/api';

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

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  driverRating?: number;
  passengerRating?: number;
}

interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  email?: string;
  formation?: string;
  specialite?: string;
  year?: string;
}

interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export const userService = {
  /**
   * Récupère les données de l'utilisateur connecté
   * @returns Promise<UserData> Les données de l'utilisateur
   */
  async getUserData(): Promise<UserData> {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.ME, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération du profil');
      }

      const data = await response.json();
      
      if (data && data.user) {
        return {
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          role: data.user.role,
          profilePicture: data.user.profilePicture ? `${IMAGES_URL}${data.user.profilePicture}` : undefined,
          formation: data.user.formation,
          specialite: data.user.specialite,
          year: data.user.year
        };
      }
      
      throw new Error('Format de réponse utilisateur invalide');
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
      const response = await fetch(API_ENDPOINTS.USERS.PUBLIC(userId), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.status === 404) {
        throw new Error('Utilisateur non trouvé');
      }
      
      if (response.status === 401) {
        throw new Error('Session expirée, veuillez vous reconnecter');
      }
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des informations utilisateur');
      }

      const userData = await response.json();
      return {
        ...userData,
        profilePicture: userData.profilePicture ? `${IMAGES_URL}${userData.profilePicture}` : undefined
      };
    } catch (error: any) {
      console.error('Erreur getUserById:', error);
      throw error;
    }
  },

  /**
   * Met à jour les données de l'utilisateur
   * @param userData Les nouvelles données de l'utilisateur
   * @returns Promise<UserData> Les données mises à jour
   */
  async updateUserData(userData: Partial<UserData>): Promise<UserData> {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.ME, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du profil');
      }

      const data = await response.json();
      
      if (data && data.user) {
        return {
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          role: data.user.role,
          profilePicture: data.user.profilePicture,
          formation: data.user.formation,
          specialite: data.user.specialite,
          year: data.user.year
        };
      }
      
      throw new Error('Format de réponse utilisateur invalide');
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
      const formData = new FormData();
      formData.append('profilePicture', file);

      const response = await fetch(API_ENDPOINTS.AUTH.PROFILE_PICTURE, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Erreur lors du téléchargement de la photo de profil');
      }

      const data = await response.json();
      return data.profilePicture || '';
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  async getCurrentUser(): Promise<User> {
    try {
      const response = await fetch(API_ENDPOINTS.USERS.ME, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération de votre profil');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur getCurrentUser:', error);
      throw error;
    }
  },

  getProfile: async () => {
    try {
      const response = await fetch(`${AUTH_API_URL}/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération du profil');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  updateProfile: async (data: UpdateUserData) => {
    try {
      const response = await fetch(`${AUTH_API_URL}/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du profil');
      }

      const responseData = await response.json();
      
      // Extraire les données utilisateur de la structure de réponse
      if (responseData && responseData.user) {
        return responseData.user;
      }
      
      throw new Error('Format de réponse utilisateur invalide');
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors du changement de mot de passe');
      }
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  async deleteProfilePicture(): Promise<void> {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.PROFILE_PICTURE, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de la photo de profil');
      }
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  uploadProfilePicture: async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('profilePicture', file);

      const response = await fetch(`${AUTH_API_URL}/profile-picture`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Erreur lors du téléchargement de la photo de profil');
      }

      const data = await response.json();
      return data.profilePicture || '';
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  deleteAccount: async () => {
    try {
      const response = await fetch(`${AUTH_API_URL}/me`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression du compte');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },
};