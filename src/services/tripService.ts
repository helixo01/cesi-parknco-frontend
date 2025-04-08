import { Trip } from '@/types/trip';
import { API_ENDPOINTS } from '@/config/api';

export const tripService = {
  // Créer un nouveau trajet
  createTrip: async (tripData: any) => {
    try {
      const response = await fetch(API_ENDPOINTS.TRIPS.BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(tripData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création du trajet');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Obtenir tous les trajets
  getAllTrips: async () => {
    try {
      const response = await fetch(API_ENDPOINTS.TRIPS.BASE, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des trajets');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Obtenir un trajet par son ID
  getTripById: async (tripId: string) => {
    try {
      const response = await fetch(API_ENDPOINTS.TRIPS.BY_ID(tripId), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération du trajet');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Obtenir mes trajets
  getMyTrips: async () => {
    try {
      const response = await fetch(API_ENDPOINTS.TRIPS.MY_TRIPS, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération de vos trajets');
      }

      const data = await response.json();
      console.log('Réponse du serveur:', data); 

      // S'assurer que les tableaux existent
      return {
        currentTrips: Array.isArray(data.currentTrips) ? data.currentTrips : [],
        historicTrips: Array.isArray(data.historicTrips) ? data.historicTrips : []
      };
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Mettre à jour un trajet
  updateTrip: async (tripId: string, tripData: any) => {
    try {
      const response = await fetch(API_ENDPOINTS.TRIPS.BY_ID(tripId), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(tripData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du trajet');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Supprimer un trajet
  deleteTrip: async (tripId: string) => {
    try {
      const response = await fetch(API_ENDPOINTS.TRIPS.BY_ID(tripId), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression du trajet');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Demander à rejoindre un trajet
  requestToJoin: async (tripId: string) => {
    try {
      const response = await fetch(API_ENDPOINTS.TRIPS.REQUESTS(tripId), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la demande de rejoindre le trajet');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Accepter une demande de rejoindre un trajet
  acceptRequest: async (tripId: string, requestId: string) => {
    try {
      const response = await fetch(API_ENDPOINTS.TRIPS.REQUEST_BY_ID(tripId, requestId), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ action: 'accept' })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'acceptation de la demande');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Refuser une demande de rejoindre un trajet
  rejectRequest: async (tripId: string, requestId: string) => {
    try {
      const response = await fetch(API_ENDPOINTS.TRIPS.REQUEST_BY_ID(tripId, requestId), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ action: 'reject' })
      });

      if (!response.ok) {
        throw new Error('Erreur lors du refus de la demande');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Confirmer un trajet en tant que conducteur
  confirmTripPickup: async (tripId: string) => {
    try {
      const response = await fetch(API_ENDPOINTS.TRIPS.CONFIRM_PICKUP(tripId), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la confirmation du trajet');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Confirmer un trajet en tant que passager
  confirmPickupAsPassenger: async (tripId: string) => {
    try {
      const response = await fetch(API_ENDPOINTS.TRIPS.CONFIRM_PICKUP_PASSENGER(tripId), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la confirmation de la prise en charge');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Noter un conducteur
  rateDriver: async (tripId: string, rating: number) => {
    try {
      const response = await fetch(`${API_ENDPOINTS.TRIPS.RATE_DRIVER(tripId)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          rating,
          isConfirmed: true
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erreur lors de la notation du conducteur');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Noter un passager
  ratePassenger: async (tripId: string, passengerId: string, rating: number, comment: string = '') => {
    try {
      const response = await fetch(`${API_ENDPOINTS.TRIPS.RATE_PASSENGER(tripId)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ passengerId, rating, comment }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la notation du passager');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Rechercher des trajets
  searchTrips: async (searchParams: any) => {
    try {
      const queryString = new URLSearchParams(searchParams).toString();
      const response = await fetch(`${API_ENDPOINTS.TRIPS.SEARCH}?${queryString}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la recherche de trajets');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  async getUserTripRequests(role: 'driver' | 'passenger') {
    try {
      const response = await fetch(API_ENDPOINTS.USERS.REQUESTS(role), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des demandes');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  async getTripRequests(tripId: string) {
    try {
      const response = await fetch(`${API_ENDPOINTS.TRIPS.REQUESTS(tripId)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des demandes');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  async rateTrip(tripId: string, rating: number) {
    try {
      const response = await fetch(API_ENDPOINTS.TRIPS.RATE(tripId), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ rating }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la notation du trajet');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  async completeTripAndRate(tripId: string, rating: number) {
    try {
      const response = await fetch(`${API_ENDPOINTS.TRIPS.COMPLETE(tripId)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ rating })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la finalisation du trajet');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  async rateAndCompleteAsPassenger(tripId: string, rating: number) {
    try {
      // D'abord confirmer la prise en charge
      console.log('Confirmation de la prise en charge en tant que passager...');
      await tripService.confirmPickupAsPassenger(tripId);

      // Ensuite noter le conducteur
      console.log('Notation du conducteur...');
      const ratingResponse = await tripService.rateDriver(tripId, rating);

      return ratingResponse;
    } catch (error) {
      console.error('Erreur lors de la confirmation et notation:', error);
      throw error;
    }
  },

  async rateAndCompleteAsDriver(tripId: string, passengerId: string, rating: number) {
    const response = await fetch(`${API_ENDPOINTS.TRIPS.RATE_PASSENGER(tripId)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        passengerId,
        rating,
        isConfirmed: true
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la notation du passager');
    }

    return response.json();
  },

  // Pour compatibilité avec la page des messages
  handleTripRequest: async (tripId: string, requestId: string, action: 'accept' | 'reject') => {
    try {
      if (action === 'accept') {
        return await tripService.acceptRequest(tripId, requestId);
      } else {
        return await tripService.rejectRequest(tripId, requestId);
      }
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Obtenir tous les trajets terminés (pour les statistiques admin)
  getAllCompletedTrips: async () => {
    try {
      const response = await fetch(`${API_ENDPOINTS.TRIPS.ADMIN_COMPLETED}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des trajets complétés');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },
};