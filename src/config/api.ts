// API URLs
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://laptop-omen-rvr';
export const AUTH_BASE_URL = `${BASE_URL}:5001`;
export const ADMIN_BASE_URL = `${BASE_URL}:5004`;
export const API_BASE_URL = `${BASE_URL}:5002`;
export const IO_URL = `${BASE_URL}:5003`;
export const OPENROUTE_API_URL = 'https://api.openrouteservice.org';

// Les images sont servies depuis le service d'authentification
export const IMAGES_URL = `${AUTH_BASE_URL}/api`;

// API Endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: `${AUTH_BASE_URL}/api/auth/login`,
    REGISTER: `${AUTH_BASE_URL}/api/auth/register`,
    LOGOUT: `${AUTH_BASE_URL}/api/auth/logout`,
    ME: `${AUTH_BASE_URL}/api/auth/me`,
    VERIFY: `${AUTH_BASE_URL}/api/auth/verify`,
    CHANGE_PASSWORD: `${AUTH_BASE_URL}/api/auth/change-password`,
    PROFILE_PICTURE: `${AUTH_BASE_URL}/api/auth/profile-picture`,
  },

  // User endpoints
  USERS: {
    ME: `${AUTH_BASE_URL}/api/auth/me`,
    PUBLIC: (userId: string) => `${AUTH_BASE_URL}/api/users/public/${userId}`,
    REQUESTS: (role: string) => `${API_BASE_URL}/api/users/requests?role=${role}`,
  },

  // Vehicle endpoints
  VEHICLES: {
    BASE: `${API_BASE_URL}/api/vehicles`,
    BY_ID: (id: string) => `${API_BASE_URL}/api/vehicles/${id}`,
  },

  // Trip endpoints
  TRIPS: {
    BASE: `${API_BASE_URL}/api/trips`,
    BY_ID: (tripId: string) => `${API_BASE_URL}/api/trips/${tripId}`,
    MY_TRIPS: `${API_BASE_URL}/api/trips/my-trips`,
    SEARCH: `${API_BASE_URL}/api/trips/search`,
    REQUESTS: (tripId: string) => `${API_BASE_URL}/api/trips/${tripId}/requests`,
    REQUEST_BY_ID: (tripId: string, requestId: string) => `${API_BASE_URL}/api/trips/${tripId}/requests/${requestId}`,
    CONFIRM_PICKUP: (tripId: string) => `${API_BASE_URL}/api/trips/${tripId}/confirm-pickup`,
    CONFIRM_PICKUP_PASSENGER: (tripId: string) => `${API_BASE_URL}/api/trips/${tripId}/confirm-pickup-passenger`,
    RATE_DRIVER: (tripId: string) => `${API_BASE_URL}/api/trips/${tripId}/rate-driver`,
    RATE_PASSENGER: (tripId: string) => `${API_BASE_URL}/api/trips/${tripId}/rate-passenger`,
    RATE: (tripId: string) => `${API_BASE_URL}/api/trips/${tripId}/rate`,
    COMPLETE: (tripId: string) => `${API_BASE_URL}/api/trips/${tripId}/complete`,
    ADMIN_COMPLETED: `${API_BASE_URL}/api/trips/admin/completed`,
  },

  // Stats endpoints
  STATS: {
    USER: (userId: string) => `${API_BASE_URL}/api/stats/users/${userId}`,
    PARKINGS: `${API_BASE_URL}/api/stats/parkings`,
    RESERVATIONS: `${API_BASE_URL}/api/stats/reservations`,
    OCCUPANCY: (params: string) => `${API_BASE_URL}/api/stats/occupancy?${params}`,
    REVENUE: (params: string) => `${API_BASE_URL}/api/stats/revenue?${params}`,
    USERS: (page: number, limit: number) => `${API_BASE_URL}/api/stats/users?page=${page}&limit=${limit}`,
  },

  // Gamification endpoints
  GAMIFICATION: {
    BASE: `${ADMIN_BASE_URL}/api/gamification`,
  },

  // OpenRoute endpoints
  OPENROUTE: {
    GEOCODING: `${OPENROUTE_API_URL}/geocode/search`,
    DIRECTIONS: `${OPENROUTE_API_URL}/v2/directions/driving-car`,
  },
};
