'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/global/Header';
import { NavBar } from '@/components/global/NavBar';
import { colors } from "@/styles/colors";
import { tripService } from '@/services/tripService';
import { useAuth } from '@/hooks/useAuth';
import { toast, Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { Division } from '@/components/global/Division';
import Message from '@/components/global/Message';

interface Trip {
  _id: string;
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
  };
  user?: {
    firstName: string;
    lastName: string;
    profilePicture?: string;
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
      const formattedDriverRequests = driverData.flatMap((trip: Trip) => 
        trip.requests.map(request => ({
          _id: request._id,
          tripId: trip._id,
          userId: request.userId,
          status: request.status,
          trip: {
            departure: trip.departure,
            arrival: trip.arrival,
            date: trip.date,
            time: trip.time
          }
        }))
      );
      setDriverRequests(formattedDriverRequests);

      // Charger les demandes en tant que passager
      const passengerData = await tripService.getUserTripRequests('passenger');
      
      // Transformer les données pour les demandes passager
      const formattedPassengerRequests = passengerData.map((trip: Trip) => {
        const request = trip.requests[0];
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
          }
        } as TripRequest;
      });

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
      <Toaster position="top-center" />
      
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
          <Division variant="default" className="p-6">
            <div className="p-4 rounded-lg" style={{ 
              backgroundColor: colors.components.info.background.error,
              color: colors.components.info.text.error
            }}>
              {error}
            </div>
          </Division>
        ) : (
          <div className="space-y-4">
            {/* Demandes reçues (conducteur) */}
            <Division variant="default" className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-white">Demandes reçues</h2>
              {driverRequests.length === 0 ? (
                <p className="text-gray-400">Aucune demande reçue</p>
              ) : (
                <div className="space-y-4">
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
                      showActions={request.status === 'pending'}
                      onAccept={() => handleRequest(request.tripId, request._id, 'accept')}
                      onReject={() => handleRequest(request.tripId, request._id, 'reject')}
                    />
                  ))}
                </div>
              )}
            </Division>

            {/* Demandes envoyées (passager) */}
            <Division variant="default" className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-white">Demandes envoyées</h2>
              {passengerRequests.length === 0 ? (
                <p className="text-gray-400">Aucune demande envoyée</p>
              ) : (
                <div className="space-y-4">
                  {passengerRequests.map((request) => (
                    <Message
                      key={request._id}
                      userName="Conducteur"
                      from={request.trip.departure}
                      to={request.trip.arrival}
                      date={formatDate(request.trip.date)}
                      time={request.trip.time}
                      status={request.status}
                    />
                  ))}
                </div>
              )}
            </Division>
          </div>
        )}
      </div>

      <NavBar activePage="messages" />
    </div>
  );
} 