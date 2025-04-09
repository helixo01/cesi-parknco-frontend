import axios from 'axios';
import { API_ENDPOINTS, OPENROUTE_API_URL } from '@/config/api';

export interface RouteInfo {
  distance: string;
  duration: string;
}

export interface OpenRouteServiceError {
  message: string;
  code?: string;
}

export interface Feature {
  properties: {
    label: string;
    country: string;
    segments?: Array<{
      distance: number;
      duration: number;
    }>;
  };
  geometry: {
    coordinates: [number, number];
  };
}

export interface GeocodingResponse {
  features: Feature[];
}

export interface DirectionsResponse {
  features: Array<{
    properties: {
      segments: Array<{
        distance: number;
        duration: number;
      }>;
    };
  }>;
}

const API_KEY = process.env.NEXT_PUBLIC_OPENROUTESERVICE_API_KEY;

// Instance axios pour le geocoding
const geocodingInstance = axios.create({
  baseURL: OPENROUTE_API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': API_KEY
  },
  timeout: 10000
});

// Instance axios pour le calcul d'itinéraire
const directionsInstance = axios.create({
  baseURL: OPENROUTE_API_URL,
  headers: {
    'Accept': 'application/json, application/geo+json',
    'Content-Type': 'application/json',
    'Authorization': API_KEY
  },
  timeout: 10000
});

// Intercepteur pour logger les requêtes en développement
if (process.env.NODE_ENV === 'development') {
  const addLogging = (instance: ReturnType<typeof axios.create>) => {
    instance.interceptors.request.use(request => {
      console.log('Request:', {
        url: request.url,
        method: request.method,
        headers: request.headers,
        params: request.params,
        data: request.data
      });
      return request;
    });

    instance.interceptors.response.use(
      response => {
        console.log('Response:', {
          status: response.status,
          data: response.data
        });
        return response;
      },
      error => {
        console.error('Response Error:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          config: error.config
        });
        return Promise.reject(error);
      }
    );
  };

  addLogging(geocodingInstance);
  addLogging(directionsInstance);
}

const checkApiKey = () => {
  if (!API_KEY) {
    throw new Error('La clé API OpenRouteService n\'est pas configurée. Veuillez vérifier votre fichier .env.local');
  }
};

export const openRouteService = {
  async getSuggestions(query: string, type: string): Promise<string[]> {
    try {
      checkApiKey();

      const response = await geocodingInstance.get<GeocodingResponse>(API_ENDPOINTS.OPENROUTE.GEOCODING.replace(OPENROUTE_API_URL, ''), {
        params: {
          text: query,
          'boundary.country': 'FR',
          size: 5,
          layers: 'locality,neighbourhood'
        }
      });

      if (!response.data.features?.length) {
        return [];
      }

      return response.data.features
        .filter(feature => feature.properties.country === 'France')
        .map(feature => {
          const label = feature.properties.label;
          return label.replace(/, (France|FR)$/g, '').trim();
        });
    } catch (error: any) {
      console.error('Error getting suggestions:', error);
      if (error?.response?.data) {
        console.error('Response:', error.response.data);
        console.error('Status:', error.response.status);
      }
      return [];
    }
  },

  async calculateRoute(origin: string, destination: string): Promise<RouteInfo> {
    try {
      checkApiKey();
      
      console.log('Calculating route between:', origin, 'and', destination);

      // Convertir les adresses en coordonnées (limité à la France)
      const [originResponse, destinationResponse] = await Promise.all([
        geocodingInstance.get<GeocodingResponse>(API_ENDPOINTS.OPENROUTE.GEOCODING.replace(OPENROUTE_API_URL, ''), {
          params: {
            text: origin,
            'boundary.country': 'FR',
            layers: 'locality,neighbourhood'
          }
        }),
        geocodingInstance.get<GeocodingResponse>(API_ENDPOINTS.OPENROUTE.GEOCODING.replace(OPENROUTE_API_URL, ''), {
          params: {
            text: destination,
            'boundary.country': 'FR',
            layers: 'locality,neighbourhood'
          }
        })
      ]);

      console.log('Geocoding responses:', originResponse.data.features?.length, destinationResponse.data.features?.length);

      // Vérifier si les adresses sont valides
      if (!originResponse.data.features?.length || !destinationResponse.data.features?.length) {
        throw new Error('Adresse(s) invalide(s)');
      }

      const originCoords = originResponse.data.features[0].geometry.coordinates;
      const destinationCoords = destinationResponse.data.features[0].geometry.coordinates;

      console.log('Original coordinates:', {
        origin: {
          city: origin,
          coords: originCoords
        },
        destination: {
          city: destination,
          coords: destinationCoords
        }
      });

      // Vérifier que les coordonnées sont valides et dans les bonnes plages pour la France
      if (!Array.isArray(originCoords) || !Array.isArray(destinationCoords) || 
          originCoords.length !== 2 || destinationCoords.length !== 2 ||
          !isValidFranceCoordinates(originCoords) || !isValidFranceCoordinates(destinationCoords)) {
        throw new Error('Coordonnées invalides ou hors de France');
      }

      // Calculer l'itinéraire avec le format correct des coordonnées
      const response = await directionsInstance.get<DirectionsResponse>(API_ENDPOINTS.OPENROUTE.DIRECTIONS.replace(OPENROUTE_API_URL, ''), {
        params: {
          start: `${originCoords[0]},${originCoords[1]}`,
          end: `${destinationCoords[0]},${destinationCoords[1]}`
        }
      });

      if (!response.data.features?.length) {
        throw new Error('Aucun itinéraire trouvé');
      }

      const route = response.data.features[0];
      const segments = route.properties.segments;
      
      if (!segments || !segments[0]) {
        throw new Error('Format de réponse invalide');
      }

      const { distance, duration } = segments[0];

      return {
        distance: `${(distance / 1000).toFixed(1)} km`,
        duration: `${Math.round(duration / 60)} min`
      };
    } catch (error: any) {
      console.error('Error calculating route:', error);
      if (error?.response?.data) {
        console.error('Response:', error.response.data);
        console.error('Status:', error.response.status);
      }
      throw error;
    }
  }
};

// Fonction utilitaire pour vérifier si les coordonnées sont dans la plage valide pour la France
function isValidFranceCoordinates(coords: number[]): boolean {
  const [longitude, latitude] = coords;
  
  // Plage approximative pour la France métropolitaine
  const FRANCE_BOUNDS = {
    minLon: -5.5,  // Ouest
    maxLon: 9.6,   // Est
    minLat: 41.2,  // Sud
    maxLat: 51.5   // Nord
  };

  return (
    longitude >= FRANCE_BOUNDS.minLon &&
    longitude <= FRANCE_BOUNDS.maxLon &&
    latitude >= FRANCE_BOUNDS.minLat &&
    latitude <= FRANCE_BOUNDS.maxLat
  );
}