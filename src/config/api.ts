// API URLs
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002';
export const AUTH_API_URL = process.env.NEXT_PUBLIC_AUTH_API_URL || 'http://localhost:5001';
export const ADMIN_API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL || 'http://localhost:5004';
export const OPENROUTE_API_URL = 'https://api.openrouteservice.org';

// Les images sont servies depuis le service d'authentification
export const IMAGES_URL = AUTH_API_URL;

// API Endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: `${AUTH_API_URL}/api/auth/login`,
    REGISTER: `${AUTH_API_URL}/api/auth/register`,
    LOGOUT: `${AUTH_API_URL}/api/auth/logout`,
    ME: `${AUTH_API_URL}/api/auth/me`,
    VERIFY: `${AUTH_API_URL}/api/auth/verify`,
    CHANGE_PASSWORD: `${AUTH_API_URL}/api/auth/change-password`,
    PROFILE_PICTURE: `${AUTH_API_URL}/api/auth/profile-picture`,
  },

  // User endpoints
  USERS: {
    ME: `${API_URL}/api/users/me`,
    PUBLIC: (userId: string) => `${AUTH_API_URL}/api/users/public/${userId}`,
    REQUESTS: (role: string) => `${API_URL}/api/users/requests?role=${role}`,
  },

  // Vehicle endpoints
  VEHICLES: {
    BASE: `${API_URL}/api/vehicles`,
    BY_ID: (id: string) => `${API_URL}/api/vehicles/${id}`,
  },

  // Trip endpoints
  TRIPS: {
    BASE: `${API_URL}/api/trips`,
    BY_ID: (tripId: string) => `${API_URL}/api/trips/${tripId}`,
    MY_TRIPS: `${API_URL}/api/trips/my-trips`,
    SEARCH: (queryString: string) => `${API_URL}/api/trips/search?${queryString}`,
    REQUESTS: (tripId: string) => `${API_URL}/api/trips/${tripId}/requests`,
    REQUEST_BY_ID: (tripId: string, requestId: string) => `${API_URL}/api/trips/${tripId}/requests/${requestId}`,
    CONFIRM_PICKUP: (tripId: string) => `${API_URL}/api/trips/${tripId}/confirm-pickup`,
    CONFIRM_PICKUP_PASSENGER: (tripId: string) => `${API_URL}/api/trips/${tripId}/confirm-pickup-passenger`,
    RATE_DRIVER: (tripId: string) => `${API_URL}/api/trips/${tripId}/rate-driver`,
    RATE_PASSENGER: (tripId: string) => `${API_URL}/api/trips/${tripId}/rate-passenger`,
    RATE: (tripId: string) => `${API_URL}/api/trips/${tripId}/rate`,
    COMPLETE: (tripId: string) => `${API_URL}/api/trips/${tripId}/complete`,
    ADMIN_COMPLETED: `${API_URL}/api/trips/admin/completed`,
  },

  // Stats endpoints
  STATS: {
    USER: (userId: string) => `${API_URL}/api/stats/users/${userId}`,
    PARKINGS: `${API_URL}/api/stats/parkings`,
    RESERVATIONS: `${API_URL}/api/stats/reservations`,
    OCCUPANCY: (params: string) => `${API_URL}/api/stats/occupancy?${params}`,
    REVENUE: (params: string) => `${API_URL}/api/stats/revenue?${params}`,
    USERS: (page: number, limit: number) => `${API_URL}/api/stats/users?page=${page}&limit=${limit}`,
  },

  // Gamification endpoints
  GAMIFICATION: {
    BASE: `${ADMIN_API_URL}/api/gamification`,
  },

  // OpenRoute endpoints
  OPENROUTE: {
    GEOCODING: `${OPENROUTE_API_URL}/geocode/search`,
    DIRECTIONS: `${OPENROUTE_API_URL}/v2/directions`,
  },
};
