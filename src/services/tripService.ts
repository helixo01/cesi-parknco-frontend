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
      if (error instanceof Error) {
        throw new Error(`Erreur lors de la création du trajet : ${error.message}`);
      } else {
        throw error;
      }
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
  },

  async createTripRequest(tripId: string) {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Non connecté');
    }

    try {
      const response = await fetch(`${API_URL}/trips/${tripId}/requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 401) {
        localStorage.removeItem('token');
        throw new Error('Session expirée');
      }

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erreur lors de la création de la demande');
      }

      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Erreur lors de la création de la demande : ${error.message}`);
      } else {
        throw error;
      }
    }
  },

  async handleTripRequest(tripId: string, requestId: string, action: 'accept' | 'reject') {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Non connecté');
    }

    try {
      const response = await fetch(`${API_URL}/trips/${tripId}/requests/${requestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ action })
      });

      if (response.status === 401) {
        localStorage.removeItem('token');
        throw new Error('Session expirée');
      }

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erreur lors de la gestion de la demande');
      }

      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Erreur lors de la gestion de la demande : ${error.message}`);
      } else {
        throw error;
      }
    }
  },

  async getUserTripRequests(role: 'driver' | 'passenger') {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Non connecté');
    }

    try {
      const response = await fetch(`${API_URL}/users/requests?role=${role}`, {
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
        throw new Error(error.message || 'Erreur lors de la récupération des demandes');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },

  async getTripRequests(tripId: string) {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Non connecté');
    }

    try {
      const response = await fetch(`${API_URL}/trips/${tripId}/requests`, {
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
        throw new Error(error.message || 'Erreur lors de la récupération des demandes');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },

  async searchTrips(searchParams: { departure: string; arrival: string; date: string; time: string }) {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Non connecté');
    }

    try {
      const queryParams = new URLSearchParams({
        departure: searchParams.departure,
        arrival: searchParams.arrival,
        date: searchParams.date,
        time: searchParams.time
      });

      const response = await fetch(`${API_URL}/trips/search?${queryParams}`, {
        method: 'GET',
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
        throw new Error(error.message || 'Erreur lors de la recherche des trajets');
      }

      const trips = await response.json();
      return trips;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Erreur lors de la recherche des trajets : ${error.message}`);
      } else {
        throw error;
      }
    }
  }
};