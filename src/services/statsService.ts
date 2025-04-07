import { API_URL } from '@/config';

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

export const getUserStats = async (userId: string): Promise<UserStats> => {
  try {
    const response = await fetch(`${API_URL}/api/stats/users/${userId}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user stats');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user stats:', error);
    throw error;
  }
};

export const getParkingStats = async (): Promise<ParkingStats> => {
  try {
    const response = await fetch(`${API_URL}/api/stats/parkings`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch parking stats');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching parking stats:', error);
    throw error;
  }
};

export const getReservationStats = async (): Promise<ReservationStats> => {
  try {
    const response = await fetch(`${API_URL}/api/stats/reservations`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch reservation stats');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching reservation stats:', error);
    throw error;
  }
};

export const getOccupancyStats = async (
  startDate: Date,
  endDate: Date,
  interval: 'hour' | 'day' | 'week' | 'month' = 'hour'
): Promise<OccupancyStats> => {
  try {
    const params = new URLSearchParams({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      interval
    });

    const response = await fetch(`${API_URL}/api/stats/occupancy?${params}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch occupancy stats');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching occupancy stats:', error);
    throw error;
  }
};

export const getRevenueStats = async (
  startDate: Date,
  endDate: Date,
  groupBy: 'day' | 'week' | 'month' = 'day'
): Promise<RevenueStats> => {
  try {
    const params = new URLSearchParams({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      groupBy
    });

    const response = await fetch(`${API_URL}/api/stats/revenue?${params}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch revenue stats');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching revenue stats:', error);
    throw error;
  }
};

export const getAllUsersStats = async (page: number = 1, limit: number = 20): Promise<AllUsersStats> => {
  try {
    const response = await fetch(`${API_URL}/api/stats/users?page=${page}&limit=${limit}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch all users stats');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching all users stats:', error);
    throw error;
  }
};

export const getGamificationConfig = async (): Promise<GamificationConfig> => {
  try {
    const response = await fetch(`${API_URL}/api/gamification`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch gamification config');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching gamification config:', error);
    throw error;
  }
}; 