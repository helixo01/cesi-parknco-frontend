import { Trip } from '@/types/trip';
import { API_URL } from '@/config/index';

export const tripService = {
  async createTrip(tripData: Omit<Trip, 'id' | 'userId'>) {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Non connecté');
    }

    try {
      const response = await fetch(`${API_URL}/trips`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(tripData)
      });

      if (response.status === 401) {
        localStorage.removeItem('token');
        throw new Error('Session expirée');
      }

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erreur lors de la création du trajet');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },

  async getMyTrips() {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Non connecté');
    }

    try {
      const response = await fetch(`${API_URL}/trips/my-trips`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 401) {
        localStorage.removeItem('token');
        throw new Error('Session expirée');
      }

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erreur lors de la récupération des trajets');
      }

      const data = await response.json();
      return {
        currentTrips: data.currentTrips.filter((trip: Trip) => trip.userId),
        historicTrips: data.historicTrips.filter((trip: Trip) => trip.userId)
      };
    } catch (error) {
      throw error;
    }
  }
};