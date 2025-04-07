import { API_URL } from '@/config/api';

const ADMIN_API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL || 'http://localhost:5004';

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

export const getGamificationConfig = async (): Promise<GamificationConfig> => {
  const response = await fetch(`${ADMIN_API_URL}/api/gamification`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch gamification config');
  }

  return response.json();
};

export const updateGamificationConfig = async (config: GamificationConfig): Promise<GamificationConfig> => {
  const response = await fetch(`${ADMIN_API_URL}/api/gamification`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(config),
  });

  if (!response.ok) {
    throw new Error('Failed to update gamification config');
  }

  return response.json();
}; 