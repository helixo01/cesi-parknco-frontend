'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/global/Header';
import { NavBar } from '@/components/global/NavBar';
import { colors } from '@/styles/colors';
import { Trip } from '@/types/trip';
import { tripService } from '@/services/tripService';
import TrajetItem from '@/components/global/TrajetItem';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { openRouteService } from '@/services/openRouteService';

export default function SearchTrip() {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [trips, setTrips] = useState<Trip[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
  }, [isAuthenticated, authLoading, router]);

  const handleSearch = async () => {
    try {
      setError(null);

      if (!departure || !arrival || !date || !time) {
        setError('Veuillez remplir tous les champs');
        return;
      }

      const searchParams = {
        departure,
        arrival,
        date,
        time
      };

      const trips = await tripService.searchTrips(searchParams);
      console.log('Trajets trouvés:', JSON.stringify(trips, null, 2));
      setTrips(trips);

      if (trips.length === 0) {
        setError('Aucun trajet trouvé');
      }
    } catch (error) {
      setError('Erreur lors de la recherche');
    }
  };

<<<<<<< Updated upstream
=======
  const handleTripClick = (trip: Trip) => {
    console.log('Trip sélectionné (détaillé):', JSON.stringify(trip, null, 2));
    console.log('Driver info:', trip.driver);
    setSelectedTrip(trip);
  };

  const handleCloseModal = () => {
    setSelectedTrip(null);
  };

  const handleRequestSent = () => {
    handleCloseModal();
  };

>>>>>>> Stashed changes
  return (
    <div>
      <Header 
        texteNormal="Recherche de"
        texteGras="trajet"
      />
      <NavBar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            Rechercher un trajet
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Ville de départ
              </label>
              <input
                type="text"
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Paris"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Ville d'arrivée
              </label>
              <input
                type="text"
                value={arrival}
                onChange={(e) => setArrival(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Lyon"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Heure
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            onClick={handleSearch}
            className="w-full md:w-auto bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Rechercher
          </button>

          {error && (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          {trips.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                {trips.length} trajet(s) trouvé(s)
              </h2>
              <div className="space-y-4">
                {trips.map((trip) => (
                  <TrajetItem key={trip._id} trip={trip} showApplyButton={true} />
                ))}
              </div>
            </div>
          )}
<<<<<<< Updated upstream
        </div>
      </main>
=======
        </Division>
      </div>

      <Modal isOpen={!!selectedTrip} onClose={handleCloseModal}>
        {selectedTrip && selectedTrip.driver && (
          <TripItemDetail
            id={selectedTrip._id}
            startDate={selectedTrip.date}
            startTime={selectedTrip.time}
            endTime={selectedTrip.arrivalTime}
            from={selectedTrip.departure}
            fromAddress={selectedTrip.departure}
            to={selectedTrip.arrival}
            toAddress={selectedTrip.arrival}
            duration={selectedTrip.duration}
            driver={selectedTrip.driver}
            onRequestSent={handleRequestSent}
          />
        )}
      </Modal>

      <NavBar activePage="home" />
>>>>>>> Stashed changes
    </div>
  );
}