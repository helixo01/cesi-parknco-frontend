export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002';
export const AUTH_API_URL = process.env.NEXT_PUBLIC_AUTH_API_URL || 'http://localhost:5001';
export const IMAGES_URL = AUTH_API_URL; // Les images sont servies depuis le service d'authentification
