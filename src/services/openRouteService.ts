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

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': API_KEY
  },
  timeout: 10000 // 10 secondes
});

const checkApiKey = () => {
  if (!API_KEY) {
    throw new Error('La clé API OpenRouteService n\'est pas configurée. Veuillez vérifier votre fichier .env.local');
  }
};

export const openRouteService = {
  async getSuggestions(query: string, type: string): Promise<string[]> {
    try {
      checkApiKey();

      const response = await axiosInstance.get<GeocodingResponse>('/geocode/autocomplete', {
        params: {
          text: query,
          boundary_country: 'FR',
          size: 5,
          limit: 5
        }
      });

      if (!response.data.features?.length) {
        return [];
      }

      // Filtrer les suggestions pour ne garder que les villes en France
      // et enlever "France" de la suggestion
      return response.data.features
        .filter(feature => feature.properties.country === 'France')
        .map(feature => {
          const label = feature.properties.label;
          // Enlever "France" de la suggestion
          const withoutFrance = label.replace(', France', '');
          // Enlever "FR" de la suggestion
          const withoutFR = withoutFrance.replace(', FR', '');
          return withoutFR.trim();
        });
    } catch (error) {
      console.error('Error getting suggestions:', error);
      if (axios.isAxiosError(error)) {
        console.error('Response:', error.response?.data);
        console.error('Status:', error.response?.status);
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
        axiosInstance.get<GeocodingResponse>('/geocode/autocomplete', {
          params: {
            text: origin,
            boundary_country: 'FR'
          }
        }),
        axiosInstance.get<GeocodingResponse>('/geocode/autocomplete', {
          params: {
            text: destination,
            boundary_country: 'FR'
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

      console.log('Coordinates:', originCoords, destinationCoords);

      // Vérifier que les coordonnées sont valides
      if (!Array.isArray(originCoords) || !Array.isArray(destinationCoords) || 
          originCoords.length !== 2 || destinationCoords.length !== 2) {
        throw new Error('Coordonnées invalides');
      }

      // Calculer l'itinéraire
      const response = await axiosInstance.get('/v2/directions/driving-car', {
        params: {
          start: `${originCoords[0]},${originCoords[1]}`,
          end: `${destinationCoords[0]},${destinationCoords[1]}`
        }
      });

      if (!response.data.features?.length) {
        throw new Error('Aucun itinéraire trouvé');
      }

      const route = response.data.features[0];
      const distance = (route.properties.summary.distance / 1000).toFixed(1) + ' km';
      const duration = Math.round(route.properties.summary.duration / 60) + ' min';

      console.log('Route calculated:', { distance, duration });

      return {
        distance,
        duration
      };
    } catch (error: unknown) {
      console.error('Error calculating route:', error);
      
      if (axios.isAxiosError(error)) {
        console.error('Response:', error.response?.data);
        console.error('Status:', error.response?.status);
      }
      
      if (error instanceof Error) {
        throw new Error(`Erreur lors du calcul du trajet: ${error.message}`);
      }
      
      throw new Error('Impossible de calculer l\'itinéraire. Veuillez vérifier vos adresses et réessayer.');
    }
  }
};