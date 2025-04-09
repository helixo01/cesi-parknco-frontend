import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { DesktopHeader } from '@/components/admin/DesktopHeader';
import { colors } from '@/styles/colors';
import { Montserrat } from 'next/font/google';
import { FaCar, FaRoad, FaUser, FaCity } from 'react-icons/fa';
import { tripService } from '@/services/tripService';
import { getAllUsersStats } from '@/services/statsService';

const montserrat = Montserrat({ subsets: ['latin'] });

interface TripData {
  currentTrips: any[];
  historicTrips: any[];
}

interface CompletedTrip {
  _id: string;
  departure: string;
  arrival: string;
  distance: string;
  date: string;
  status: string;
}

interface CityCount {
  city: string;
  count: number;
}

const Statistics: React.FC = () => {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [tripCount, setTripCount] = useState<number>(0);
  const [totalDistance, setTotalDistance] = useState<number>(0);
  const [userCount, setUserCount] = useState<number>(0);
  const [topCities, setTopCities] = useState<CityCount[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigationItems = [
    { label: 'Statistiques', path: '/admin/statistiques' },
    { label: 'Gamification', path: '/admin/gamification' },
    { 
      label: 'Parking IoT',
      path: 'https://parknco.grafana.net/public-dashboards/4c57922c82824de7b252ecd35bb5cfc8',
      isExternal: true
    },
    { label: 'Utilisateurs', path: '/admin/users' }
  ];

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.replace('/login');
      } else if (user && user.role !== 'admin_user') {
        router.replace('/');
      } else {
        fetchStatistics();
      }
    }
  }, [loading, isAuthenticated, user, router]);

  const fetchStatistics = async () => {
    setIsLoading(true);
    try {
      let totalTrips = 0;
      let totalKm = 0;
      let cityFrequency = new Map<string, number>();

      try {
        // Récupérer tous les trajets terminés avec gestion d'erreur spécifique
        const completedTrips: CompletedTrip[] = await tripService.getAllCompletedTrips();
        
        // Nombre total de trajets
        totalTrips = completedTrips.length;
        
        // Calculer la distance totale parcourue
        completedTrips.forEach((trip: CompletedTrip) => {
          // Ajouter la distance (convertir de string à nombre)
          const tripDistance = parseFloat(trip.distance);
          if (!isNaN(tripDistance)) {
            totalKm += tripDistance;
          }
          
          // Compter les occurrences des villes de départ
          if (trip.departure) {
            const count = cityFrequency.get(trip.departure) || 0;
            cityFrequency.set(trip.departure, count + 1);
          }
          
          // Compter les occurrences des villes d'arrivée
          if (trip.arrival) {
            const count = cityFrequency.get(trip.arrival) || 0;
            cityFrequency.set(trip.arrival, count + 1);
          }
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des trajets:", error);
        // En cas d'échec, utiliser des données simulées ou des valeurs par défaut
        totalTrips = 0;
        totalKm = 0;
      }
      
      // Mettre à jour les états avec les valeurs obtenues
      setTripCount(totalTrips);
      setTotalDistance(totalKm);
      
      // Trier les villes par nombre d'occurrences et prendre les 5 premières
      const sortedCities = Array.from(cityFrequency.entries())
        .map(([city, count]) => ({ city, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
      
      setTopCities(sortedCities);
      
      try {
        // Récupérer le nombre d'utilisateurs
        const usersStats = await getAllUsersStats();
        setUserCount(usersStats.total);
      } catch (error) {
        console.error("Erreur lors de la récupération des stats utilisateurs:", error);
        setUserCount(0);
      }
      
    } catch (error) {
      console.error("Erreur générale lors de la récupération des statistiques:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading || isLoading) {
    return (
      <div className={`flex min-h-screen items-center justify-center ${montserrat.className}`} style={{ backgroundColor: colors.background.page }}>
        <p className="text-white text-2xl font-semibold">Chargement...</p>
      </div>
    );
  }

  if (!isAuthenticated || (user && user.role !== 'admin_user')) {
    return null;
  }

  return (
    <div className={`min-h-screen ${montserrat.className}`} style={{ backgroundColor: colors.background.page }}>
      <DesktopHeader items={navigationItems} />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">Statistiques de l'application</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Carte statistique: Nombre de trajets */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex items-start">
            <div className="bg-blue-500 p-3 rounded-full mr-4">
              <FaCar className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-gray-400 text-sm font-medium">Nombre de trajets</h2>
              <p className="text-white text-2xl font-bold">{tripCount}</p>
            </div>
          </div>
          
          {/* Carte statistique: Km parcourus */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex items-start">
            <div className="bg-green-500 p-3 rounded-full mr-4">
              <FaRoad className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-gray-400 text-sm font-medium">Kilomètres parcourus</h2>
              <p className="text-white text-2xl font-bold">{totalDistance.toFixed(1)} km</p>
            </div>
          </div>
          
          {/* Carte statistique: Nombre d'utilisateurs */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex items-start">
            <div className="bg-purple-500 p-3 rounded-full mr-4">
              <FaUser className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-gray-400 text-sm font-medium">Nombre d'utilisateurs</h2>
              <p className="text-white text-2xl font-bold">{userCount}</p>
            </div>
          </div>
          
          {/* Carte statistique: Ville la plus populaire */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex items-start">
            <div className="bg-yellow-500 p-3 rounded-full mr-4">
              <FaCity className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-gray-400 text-sm font-medium">Ville la plus populaire</h2>
              <p className="text-white text-2xl font-bold">
                {topCities.length > 0 ? topCities[0].city : "Aucune"}
              </p>
            </div>
          </div>
        </div>
        
        {/* Liste des villes les plus recherchées */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-white text-xl font-bold mb-4">Top 5 des villes les plus recherchées</h2>
          <div className="overflow-hidden bg-gray-700 shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-gray-600">
              <thead className="bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Classement
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Ville
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Nombre de recherches
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-700 divide-y divide-gray-600">
                {topCities.length > 0 ? (
                  topCities.map((city, index) => (
                    <tr key={city.city}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        {city.city}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {city.count}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-300">
                      Aucune donnée disponible
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Statistics; 