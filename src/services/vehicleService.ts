import { API_ENDPOINTS } from '@/config/api';

export interface Vehicle {
  _id: string;
  type: 'électrique' | 'diesel' | 'essence' | 'hybride' | 'autre';
  seats: number;
  name: string;
  createdAt: string;
}

export const vehicleService = {
  /**
   * Récupère tous les véhicules de l'utilisateur
   * @returns Promise<Vehicle[]> Les véhicules de l'utilisateur
   */
  async getUserVehicles(): Promise<Vehicle[]> {
    try {
      const response = await fetch(API_ENDPOINTS.VEHICLES.BASE, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des véhicules');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  /**
   * Crée un nouveau véhicule
   * @param vehicle Les données du véhicule à créer
   * @returns Promise<Vehicle> Le véhicule créé
   */
  async createVehicle(vehicle: Omit<Vehicle, '_id' | 'createdAt'>): Promise<Vehicle> {
    try {
      const response = await fetch(API_ENDPOINTS.VEHICLES.BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(vehicle),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la création du véhicule');
      }

      const data = await response.json();
      return data.vehicle;
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  /**
   * Met à jour un véhicule existant
   * @param id L'ID du véhicule à mettre à jour
   * @param vehicle Les nouvelles données du véhicule
   * @returns Promise<Vehicle> Le véhicule mis à jour
   */
  async updateVehicle(id: string, vehicle: Partial<Omit<Vehicle, '_id' | 'createdAt'>>): Promise<Vehicle> {
    try {
      const response = await fetch(API_ENDPOINTS.VEHICLES.BY_ID(id), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(vehicle),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la mise à jour du véhicule');
      }

      const data = await response.json();
      return data.vehicle;
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  /**
   * Supprime un véhicule
   * @param id L'ID du véhicule à supprimer
   * @returns Promise<void>
   */
  async deleteVehicle(id: string): Promise<void> {
    try {
      const response = await fetch(API_ENDPOINTS.VEHICLES.BY_ID(id), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la suppression du véhicule');
      }
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  }
}; 