'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/global/Header';
import { NavBar } from '@/components/global/NavBar';
import { colors } from "@/styles/colors";
import { Trip } from '@/types/trip';
import { tripService } from '@/services/tripService';
import TrajetItem from '@/components/global/TrajetItem';
import Tag from '@/components/global/Tag';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';

export default function Trips() {
  const [allTrips, setAllTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();

  // État pour le filtre actif
  const [activeFilter, setActiveFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  // Options de filtrage
  const filterOptions = [
    { id: 'all', label: 'Tout' },
    { id: 'upcoming', label: 'À venir' },
    { id: 'past', label: 'Passé' }
  ];

  // Fonction pour vérifier si un trajet est passé ou à venir
  const isPassedTrip = (trip: Trip) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [hours, minutes] = trip.time.split(':').map(Number);
    const tripDate = new Date(trip.date);
    tripDate.setHours(hours, minutes, 0, 0);

    return tripDate < new Date();
  };

  // Fonction pour comparer deux dates avec leurs heures
  const compareDatesWithTime = (tripA: Trip, tripB: Trip) => {
    const dateA = new Date(tripA.date);
    const dateB = new Date(tripB.date);
    
    if (dateA.getTime() === dateB.getTime()) {
      const [hoursA, minutesA] = tripA.time.split(':').map(Number);
      const [hoursB, minutesB] = tripB.time.split(':').map(Number);
      return (hoursB * 60 + minutesB) - (hoursA * 60 + minutesA);
    }
    
    return dateB.getTime() - dateA.getTime();
  };

  // Fonction pour trier les trajets par date et heure
  const sortTripsByDateTime = (trips: Trip[]) => {
    return [...trips].sort(compareDatesWithTime);
  };

  // Fonction pour filtrer les trajets
  const filterTrips = (trips: Trip[]) => {
    let filteredTrips = [...trips];

    switch (activeFilter) {
      case 'upcoming':
        filteredTrips = filteredTrips.filter(trip => !isPassedTrip(trip));
        break;
      case 'past':
        filteredTrips = filteredTrips.filter(trip => isPassedTrip(trip));
        break;
    }

    return sortTripsByDateTime(filteredTrips);
  };

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const fetchTrips = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await tripService.getMyTrips();
        setAllTrips([...response.currentTrips, ...response.historicTrips]);
      } catch (err) {
        if (err instanceof Error) {
          if (err.message === 'Session expirée') {
            localStorage.removeItem('token');
            router.push('/login');
          } else {
            setError(err.message);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [isAuthenticated, authLoading, router]);

  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  const filteredTrips = filterTrips(allTrips);

  return (
    <div className="min-h-screen flex flex-col p-4 pb-20" style={{ backgroundColor: colors.background.page }}>
      <div className="w-full max-w-md mx-auto space-y-8">
        <Header 
          texteNormal="Mes"
          texteGras="Trajets"
        />

        {/* Section des filtres */}
        <div className="flex flex-wrap gap-2 mb-4">
          {filterOptions.map(filter => (
            <Tag
              key={filter.id}
              label={filter.label}
              isSelected={activeFilter === filter.id}
              onClick={() => setActiveFilter(filter.id as 'all' | 'upcoming' | 'past')}
            />
          ))}
        </div>
        
        <div className="space-y-8">
          <section>
            {filteredTrips.length === 0 ? (
              <p style={{ color: colors.components.titre.text.highlight }}>Aucun trajet trouvé</p>
            ) : (
              <div className="space-y-4">
                {filteredTrips.map((trip) => (
                  <TrajetItem key={trip.id} trip={trip} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
      <NavBar activePage="trips" />
    </div>
  );
}