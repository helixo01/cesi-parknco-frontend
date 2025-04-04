'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/global/Header';
import { NavBar } from '@/components/global/NavBar';
import { colors } from "@/styles/colors";
import { tripService } from '@/services/tripService';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';

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
  };
  driver?: {
    firstName: string;
    lastName: string;
    profilePicture?: string;
  };
}

<<<<<<< Updated upstream
=======
const formatUserName = (user?: { firstName?: string; lastName?: string }) => {
  if (!user) return 'Utilisateur inconnu';
  if (!user.firstName && !user.lastName) return 'Utilisateur inconnu';
  if (user.firstName && !user.lastName) return user.firstName;
  if (!user.firstName && user.lastName) return user.lastName;
  return `${user.firstName} ${user.lastName}`;
};

>>>>>>> Stashed changes
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
      console.log('Demandes conducteur:', driverData);
      
      // Transformer les données pour les demandes conducteur
      const formattedDriverRequests = driverData.flatMap((trip: any) => 
        trip.requests.map((request: any) => ({
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
          user: request.user
        }))
      );
      setDriverRequests(formattedDriverRequests);

      // Charger les demandes en tant que passager
      const passengerData = await tripService.getUserTripRequests('passenger');
      console.log('Demandes passager brutes:', passengerData);
      
      // Transformer les données pour les demandes passager
<<<<<<< Updated upstream
      const formattedPassengerRequests = passengerData.map((trip: Trip) => {
        const request = trip.requests[0]; // On sait qu'il n'y a qu'une seule demande (la nôtre)
=======
      const formattedPassengerRequests = passengerData.map((trip: any) => {
        const request = trip.requests[0];
>>>>>>> Stashed changes
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
          driver: trip.driver
        } as TripRequest;
      });

      console.log('Demandes passager formatées:', formattedPassengerRequests);
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
    <div className="min-h-screen flex flex-col pb-20" style={{ backgroundColor: colors.background.page }}>
      <Header 
        texteNormal="Vos"
        texteGras="Messages"
      />
      
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center">Chargement...</div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <div className="space-y-8">
            {/* Demandes reçues (conducteur) */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Demandes reçues</h2>
              {driverRequests.length === 0 ? (
                <p className="text-gray-500">Aucune demande reçue</p>
              ) : (
                <div className="space-y-4">
                  {driverRequests.map((request) => (
                    <div key={request._id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">
                            {request.user?.firstName} {request.user?.lastName}
                          </p>
                          <p className="text-sm text-gray-600">
                            {request.trip.departure} → {request.trip.arrival}
                          </p>
                          <p className="text-sm text-gray-600">
                            {formatDate(request.trip.date)} à {request.trip.time}
                          </p>
                        </div>
                        {request.status === 'pending' && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleRequest(request.tripId, request._id, 'accept')}
                              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                            >
                              Accepter
                            </button>
                            <button
                              onClick={() => handleRequest(request.tripId, request._id, 'reject')}
                              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                            >
                              Refuser
                            </button>
                          </div>
                        )}
                        {request.status === 'accepted' && (
                          <span className="text-green-500">Acceptée</span>
                        )}
                        {request.status === 'rejected' && (
                          <span className="text-red-500">Refusée</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Demandes envoyées (passager) */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Demandes envoyées</h2>
              {passengerRequests.length === 0 ? (
                <p className="text-gray-500">Aucune demande envoyée</p>
              ) : (
                <div className="space-y-4">
                  {passengerRequests.map((request) => (
<<<<<<< Updated upstream
                    <div key={request._id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-gray-600">
                            {request.trip.departure} → {request.trip.arrival}
                          </p>
                          <p className="text-sm text-gray-600">
                            {formatDate(request.trip.date)} à {request.trip.time}
                          </p>
                          <p className="mt-2">
                            <span className={`font-medium px-3 py-1 rounded-full ${
                              request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              request.status === 'accepted' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {request.status === 'pending' ? 'En attente' :
                               request.status === 'accepted' ? 'Acceptée' :
                               'Refusée'}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
=======
                    <Message
                      key={request._id}
                      userName={formatUserName(request.driver)}
                      userImage={request.driver?.profilePicture}
                      from={request.trip.departure}
                      to={request.trip.arrival}
                      date={formatDate(request.trip.date)}
                      time={request.trip.time}
                      status={request.status}
                    />
>>>>>>> Stashed changes
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <NavBar activePage="messages" />
    </div>
  );
} 