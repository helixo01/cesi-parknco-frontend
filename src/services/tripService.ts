import { Trip } from '@/types/trip';
import { API_URL } from '@/config/index';


export const tripService = {
  async createTrip(tripData: Omit<Trip, 'id' | 'userId'>) {
    const response = await fetch(`${API_URL}/trips`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(tripData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la création du trajet');
    }

    return response.json();
  },

  async getAllTrips() {
    const response = await fetch(`${API_URL}/trips`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la récupération des trajets');
    }

    return response.json();
  },

  async getTripById(id: string) {
    const response = await fetch(`${API_URL}/trips/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la récupération du trajet');
    }

    return response.json();
  }
};