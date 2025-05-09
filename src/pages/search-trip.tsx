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
import { FormInput } from '@/components/global/FormInput';
import { Division } from '@/components/global/Division';
import TripItemDetail from '@/components/trip/TripItemDetail';
import { Modal } from '@/components/global/Modal';
import { ProfilPic } from '@/components/global/ProfilPic';

export default function SearchTrip() {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [trips, setTrips] = useState<Trip[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();

  // Obtenir la date et l'heure minimales (maintenant)
  const now = new Date();
  const minDate = now.toISOString().split('T')[0];
  const currentHour = now.getHours().toString().padStart(2, '0');
  const currentMinute = now.getMinutes().toString().padStart(2, '0');
  const minTime = `${currentHour}:${currentMinute}`;

  // Fonction pour vérifier si une date et une heure sont valides
  const isDateTimeValid = (selectedDate: string, selectedTime: string) => {
    if (!selectedDate || !selectedTime) return true;
    const selected = new Date(`${selectedDate}T${selectedTime}`);
    return selected > now;
  };

  // Handler pour le changement de date
  const handleDateChange = (value: string) => {
    setDate(value);
    setError(null);
    // Si la date sélectionnée est aujourd'hui, vérifier l'heure
    if (value === minDate && time && !isDateTimeValid(value, time)) {
      setTime(''); // Réinitialiser l'heure si elle est dans le passé
    }
  };

  // Handler pour le changement d'heure
  const handleTimeChange = (value: string) => {
    if (date === minDate) {
      const [hours, minutes] = value.split(':').map(Number);
      const selectedTime = new Date();
      selectedTime.setHours(hours, minutes, 0, 0);

      if (selectedTime > now) {
        setTime(value);
        setError(null);
      } else {
        setTime(value);
        setError('Veuillez sélectionner une heure future');
      }
    } else {
      setTime(value);
      setError(null);
    }
  };

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
      setSelectedTrip(null);

      // Vérifier les champs requis
      if (!departure || !arrival || !date || !time) {
        setError('Veuillez remplir tous les champs');
        return;
      }

      // Vérifier que la date et l'heure sont valides
      if (!isDateTimeValid(date, time)) {
        setError('Veuillez sélectionner une date et une heure futures');
        return;
      }

      // Rechercher les trajets
      const searchParams = {
        departure,
        arrival,
        date,
        time
      };

      const trips = await tripService.searchTrips(searchParams);
      setTrips(trips);

      // Afficher un message si aucun trajet n'est trouvé
      if (!trips || trips.length === 0) {
        setError('Aucun trajet trouvé');
      }
    } catch (error) {
      setError('Erreur lors de la recherche');
    }
  };

  const handleTripClick = (trip: Trip) => {
    setSelectedTrip(trip);
  };

  const handleCloseModal = () => {
    setSelectedTrip(null);
  };

  const handleRequestSent = () => {
    handleCloseModal();
  };

  return (
    <div className="min-h-screen flex flex-col p-4 pb-20" style={{ backgroundColor: colors.background.page }}>
      
      <div className="w-full max-w-md mx-auto space-y-8">
        <Header 
          texteNormal="Recherche de"
          texteGras="trajet"
        />
        
        <Division variant="default" className="space-y-6">
          <div className="space-y-4">
            <FormInput
              label="Ville de départ"
              type="text"
              value={departure}
              onChange={setDeparture}
              placeholder="Ex: Paris"
              required
              variant="light"
            />

            <FormInput
              label="Ville d'arrivée"
              type="text"
              value={arrival}
              onChange={setArrival}
              placeholder="Ex: Lyon"
              required
              variant="light"
            />

            <FormInput
              label="Date"
              type="date"
              value={date}
              onChange={handleDateChange}
              min={minDate}
              required
              variant="light"
            />

            <FormInput
              label="Heure"
              type="time"
              value={time}
              onChange={handleTimeChange}
              min={date === minDate ? minTime : undefined}
              required
              variant="light"
            />

            <button
              onClick={handleSearch}
              className="w-full py-3 rounded-lg text-white font-medium transition-colors hover:opacity-90"
              style={{ backgroundColor: colors.components.button.primary.background }}
            >
              Rechercher
            </button>
          </div>

          {error && (
            <div className="p-4 rounded-lg" style={{ 
              backgroundColor: colors.components.info.background.error,
              color: colors.components.info.text.error
            }}>
              {error}
            </div>
          )}

          {trips && trips.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white">
                {trips.length} trajet(s) trouvé(s)
              </h2>
              <div className="space-y-4">
                {trips.map((trip: Trip) => (
                  <div key={trip._id} onClick={() => handleTripClick(trip)} className="cursor-pointer">
                    <TrajetItem trip={trip} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </Division>
      </div>

      <Modal isOpen={!!selectedTrip} onClose={handleCloseModal}>
        {selectedTrip && (
          <TripItemDetail
            id={selectedTrip._id}
            startDate={new Date(selectedTrip.date)}
            startTime={selectedTrip.time}
            endTime={selectedTrip.arrivalTime}
            from={selectedTrip.departure}
            fromAddress={selectedTrip.departure}
            to={selectedTrip.arrival}
            toAddress={selectedTrip.arrival}
            duration={selectedTrip.duration}
            userId={selectedTrip.userId}
            rating={3}
            onRequestSent={handleRequestSent}
          />
        )}
      </Modal>

      <NavBar activePage="home" />
    </div>
  );
}