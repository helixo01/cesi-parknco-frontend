'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/global/Header';
import { NavBar } from '@/components/global/NavBar';
import { colors } from "@/styles/colors";
import { tripService } from '@/services/tripService';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { Division } from '@/components/global/Division';
import Message from '@/components/global/Message';
import { userService } from '@/services/userService';
import { getUserStats } from '@/services/statsService';

interface Trip {
  _id: string;
  userId: string;
  departure: string;
  arrival: string;
  date: string;
  time: string;
  requests: Array<{
    _id: string;
    userId: string;
    status: 'pending' | 'accepted' | 'rejected';
  }>;
}

interface TripRequest {
  _id: string;
  tripId: string;
  userId: string;
  status: 'pending' | 'accepted' | 'rejected';
  trip: {
    departure: string;
    arrival: string;
    date: string;
    time: string;
    userId?: string;
    user?: {
      firstName: string;
      lastName: string;
      profilePicture?: string;
      averageRating?: number;
    };
  };
  user?: {
    firstName: string;
    lastName: string;
    profilePicture?: string;
    averageRating?: number;
  };
}

const formatUserName = (user?: { firstName?: string; lastName?: string }) => {
  if (!user?.firstName && !user?.lastName) return 'Utilisateur inconnu';
  if (user.firstName && !user.lastName) return user.firstName;
  if (!user.firstName && user.lastName) return user.lastName;
  if (user.firstName && user.lastName) return `${user.firstName} ${user.lastName.charAt(0)}.`;
  return 'Utilisateur inconnu';
};

export default function Messages() {
  const [driverRequests, setDriverRequests] = useState<TripRequest[]>([]);
  const [passengerRequests, setPassengerRequests] = useState<TripRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, loading: authLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    loadRequests();
  }, [isAuthenticated, authLoading, router]);

  const loadRequests = async () => {
    try {
      setLoading(true);
      setError(null);

      // Charger les demandes en tant que conducteur
      const driverData = await tripService.getUserTripRequests('driver');
      
      // Transformer les données pour les demandes conducteur
      const formattedDriverRequests = await Promise.all(driverData.flatMap(async (trip: Trip) => 
        await Promise.all(trip.requests.map(async request => {
          // Récupérer les informations du passager
          let passengerInfo;
          try {
            passengerInfo = await userService.getUserById(request.userId);
            // Récupérer les statistiques du passager
            const passengerStats = await getUserStats(request.userId);
            passengerInfo = {
              ...passengerInfo,
              averageRating: passengerStats.averageRating
            };
          } catch (error) {
            console.error('Erreur lors de la récupération des infos passager:', error);
            passengerInfo = null;
          }

          return {
            _id: request._id,
            tripId: trip._id,
            userId: request.userId,
            status: request.status,
            trip: {
              departure: trip.departure,
              arrival: trip.arrival,
              date: trip.date,
              time: trip.time
            },
            user: passengerInfo
          };
        }))
      ));
      setDriverRequests(formattedDriverRequests.flat());

      // Charger les demandes en tant que passager
      const passengerData = await tripService.getUserTripRequests('passenger');
      console.log('Données passager reçues:', passengerData);
      
      // Transformer les données pour les demandes passager
      const formattedPassengerRequests = await Promise.all(passengerData.map(async (trip: Trip) => {
        const request = trip.requests[0];
        console.log('Trip data:', trip);
        
        // Récupérer les informations du conducteur
        let driverInfo = null;
        if (trip.userId) {
          try {
            driverInfo = await userService.getUserById(trip.userId);
            // Récupérer les statistiques du conducteur
            const driverStats = await getUserStats(trip.userId);
            driverInfo = {
              ...driverInfo,
              averageRating: driverStats.averageRating
            };
          } catch (error) {
            console.error('Erreur lors de la récupération des infos conducteur:', error);
            // En cas d'erreur, on continue avec les informations de base
            driverInfo = {
              firstName: 'Conducteur',
              lastName: '',
              profilePicture: null,
              averageRating: 0
            };
          }
        }

        return {
          _id: request._id,
          tripId: trip._id,
          userId: request.userId,
          status: request.status,
          trip: {
            departure: trip.departure,
            arrival: trip.arrival,
            date: trip.date,
            time: trip.time,
            userId: trip.userId,
            user: driverInfo
          }
        } as TripRequest;
      }));

      console.log('Requêtes passager formatées:', formattedPassengerRequests);
      setPassengerRequests(formattedPassengerRequests);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = async (tripId: string, requestId: string, action: 'accept' | 'reject') => {
    try {
      await tripService.handleTripRequest(tripId, requestId, action);
      toast.success(action === 'accept' ? 'Demande acceptée' : 'Demande refusée');
      loadRequests(); // Recharger les demandes
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue";
      toast.error(errorMessage);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen flex flex-col p-4 pb-20" style={{ backgroundColor: colors.background.page }}>
      
      <div className="w-full max-w-md mx-auto space-y-8">
        <Header 
          texteNormal="Vos"
          texteGras="Messages"
        />

        {loading ? (
          <Division variant="default" className="p-6 text-center text-white">
            Chargement...
          </Division>
        ) : error ? (
          <Division variant="default" className="p-6 text-center text-white">
            {error}
          </Division>
        ) : (
          <>
            {/* Demandes reçues (en tant que conducteur) */}
            {driverRequests.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Demandes reçues</h2>
                {driverRequests.map((request) => (
                  <Message
                    key={request._id}
                    userName={formatUserName(request.user)}
                    userImage={request.user?.profilePicture}
                    from={request.trip.departure}
                    to={request.trip.arrival}
                    date={formatDate(request.trip.date)}
                    time={request.trip.time}
                    status={request.status}
                    onAccept={() => handleRequest(request.tripId, request._id, 'accept')}
                    onReject={() => handleRequest(request.tripId, request._id, 'reject')}
                    showActions={request.status === 'pending'}
                    averageRating={request.user?.averageRating}
                  />
                ))}
              </div>
            )}

            {/* Demandes envoyées (en tant que passager) */}
            {passengerRequests.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Demandes envoyées</h2>
                {passengerRequests.map((request) => (
                  <Message
                    key={request._id}
                    userName={formatUserName(request.trip.user)}
                    userImage={request.trip.user?.profilePicture}
                    from={request.trip.departure}
                    to={request.trip.arrival}
                    date={formatDate(request.trip.date)}
                    time={request.trip.time}
                    status={request.status}
                    averageRating={request.trip.user?.averageRating}
                  />
                ))}
              </div>
            )}

            {driverRequests.length === 0 && passengerRequests.length === 0 && (
              <Division variant="default" className="p-6 text-center text-white">
                Aucun message
              </Division>
            )}
          </>
        )}
      </div>

      <NavBar />
    </div>
  );
} 