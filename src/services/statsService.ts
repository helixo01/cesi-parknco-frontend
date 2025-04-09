import { API_ENDPOINTS } from '@/config/api';

export interface GamificationConfig {
  pointsPerKm: number;
  pointsProposedTrip: number;
  pointsJoinTrip: number;
  pointsRating: number;
  pointsGoodRating: number;
  bonusFullCar: number;
  bonusElectricCar: number;
  bonusWeeklyActive: boolean;
  bonusWeeklyPercentage: number;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  points: number;
  rank: number;
  role: string;
}

export interface UserStats {
  totalPoints: number;
  averageRating: number;
  rank: number;
  leaderboard: LeaderboardEntry[];
  role?: string;
}

export interface ParkingStats {
  total: number;
  totalSpaces: number;
  occupiedSpaces: number;
  availableSpaces: number;
  occupancyRate: number;
  currentOccupancy: number;
  peakOccupancy: number;
  lowOccupancy: number;
  occupancyTrends: number[];
  totalRevenue: number;
  dailyRevenue: number;
  weeklyRevenue: number;
  monthlyRevenue: number;
  averageOccupancyTime: number;
}

export interface ReservationStats {
  total: number;
  active: number;
  completed: number;
  cancelled: number;
  averageDuration: number;
}

export interface OccupancyData {
  timestamp: string;
  occupancy: number;
  occupancyRate: string;
}

export interface OccupancyStats {
  occupancyData: OccupancyData[];
  averageOccupancy: number;
  peakHours: { hour: number; count: number }[];
  quietHours: { hour: number; count: number }[];
}

export interface RevenueData {
  period: string;
  revenue: string;
}

export interface ParkingRevenue {
  parkingId: string;
  name: string;
  revenue: number;
}

export interface RevenueStats {
  revenueData: RevenueData[];
  totalRevenue: number;
  averageRevenue: number;
  bestPerformingParkings: ParkingRevenue[];
}

export interface AllUsersStats {
  users: LeaderboardEntry[];
  total: number;
  page: number;
  pages: number;
}

export const statsService = {
  async getUserStats(userId: string): Promise<UserStats> {
    try {
      const response = await fetch(API_ENDPOINTS.STATS.USER(userId), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des statistiques utilisateur');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw new Error('Erreur lors de la récupération des statistiques utilisateur');
    }
  },

  async getParkingStats(): Promise<ParkingStats> {
    try {
      const response = await fetch(API_ENDPOINTS.STATS.PARKINGS, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des statistiques de parking');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  async getReservationStats(): Promise<ReservationStats> {
    try {
      const response = await fetch(API_ENDPOINTS.STATS.RESERVATIONS, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des statistiques de réservation');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  async getOccupancyStats(params: string): Promise<OccupancyStats> {
    try {
      const response = await fetch(API_ENDPOINTS.STATS.OCCUPANCY(params), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des statistiques d\'occupation');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  async getRevenueStats(params: string): Promise<RevenueStats> {
    try {
      const response = await fetch(API_ENDPOINTS.STATS.REVENUE(params), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des statistiques de revenus');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  async getUsersStats(page: number, limit: number): Promise<AllUsersStats> {
    try {
      const response = await fetch(API_ENDPOINTS.STATS.USERS(page, limit), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des statistiques utilisateurs');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  async getGamificationStats(): Promise<GamificationConfig> {
    try {
      const response = await fetch(API_ENDPOINTS.GAMIFICATION.BASE, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des statistiques de gamification');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },
}; 