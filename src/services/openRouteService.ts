import axios from 'axios';

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
  };
  geometry: {
    coordinates: [number, number];
  };
}

export interface GeocodingResponse {
  features: Feature[];
}

const API_BASE_URL = 'https://api.openrouteservice.org';
const API_KEY = process.env.NEXT_PUBLIC_OPENROUTESERVICE_API_KEY;

// Instance axios pour le geocoding
const geocodingInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': API_KEY
  },
  timeout: 10000
});

// Instance axios pour le calcul d'itinéraire
const directionsInstance = axios.create({
  baseURL: API_BASE_URL,
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

      const response = await geocodingInstance.get<GeocodingResponse>('/geocode/search', {
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
    } catch (error) {
      console.error('Error getting suggestions:', error);
      if (axios.isAxiosError(error)) {
        console.error('Response:', error.response?.data);
        console.error('Status:', error.response?.status);
        console.error('Config:', error.config);
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
        geocodingInstance.get<GeocodingResponse>('/geocode/search', {
          params: {
            text: origin,
            'boundary.country': 'FR',
            layers: 'locality,neighbourhood'
          }
        }),
        geocodingInstance.get<GeocodingResponse>('/geocode/search', {
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
      const response = await directionsInstance.get('/v2/directions/driving-car', {
        params: {
          start: originCoords.join(','),
          end: destinationCoords.join(',')
        }
      });

      if (!response.data.features?.length) {
        throw new Error('Aucun itinéraire trouvé');
      }

      const route = response.data.features[0];
      const properties = route.properties;
      
      if (!properties || typeof properties.segments?.[0]?.distance !== 'number' || 
          typeof properties.segments?.[0]?.duration !== 'number') {
        throw new Error('Format de réponse invalide');
      }

      const distanceInKm = properties.segments[0].distance / 1000;
      const durationInMinutes = Math.round(properties.segments[0].duration / 60);
      
      console.log('Raw route data:', {
        distance: properties.segments[0].distance,
        duration: properties.segments[0].duration,
        distanceInKm,
        durationInMinutes
      });

      const distance = distanceInKm.toFixed(1) + ' km';
      const duration = durationInMinutes + ' min';

      console.log('Formatted route:', { distance, duration });

      return {
        distance,
        duration
      };
    } catch (error: unknown) {
      console.error('Error calculating route:', error);
      
      if (axios.isAxiosError(error)) {
        console.error('Response:', error.response?.data);
        console.error('Status:', error.response?.status);
        console.error('Config:', error.config);
      }
      
      if (error instanceof Error) {
        throw new Error(`Erreur lors du calcul du trajet: ${error.message}`);
      }
      
      throw new Error('Impossible de calculer l\'itinéraire. Veuillez vérifier vos adresses et réessayer.');
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