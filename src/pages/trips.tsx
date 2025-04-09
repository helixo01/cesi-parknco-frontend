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
import { toast } from 'react-hot-toast';
import { TripRatingModal } from '@/components/trip/TripRatingModal';

interface ExtendedTrip extends Trip {
  isCurrent: boolean;
  needsAction?: boolean;
  // needsRating est déjà hérité de Trip, et il est optionnel dans Trip (needsRating?: boolean)
}

export default function Trips() {
  const [allTrips, setAllTrips] = useState<ExtendedTrip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  const userId = user?.id;

  // État pour le filtre actif
  const [activeFilter, setActiveFilter] = useState<'all' | 'driver' | 'passenger' | 'upcoming' | 'past'>('all');

  // Appliquer le filtre depuis l'URL lors du chargement de la page
  useEffect(() => {
    if (router.query.filter && typeof router.query.filter === 'string') {
      const urlFilter = router.query.filter as 'all' | 'driver' | 'passenger' | 'upcoming' | 'past';
      if (['all', 'driver', 'passenger', 'upcoming', 'past'].includes(urlFilter)) {
        setActiveFilter(urlFilter);
      }
    }
  }, [router.query.filter]);

  // Mettre à jour l'URL quand le filtre change
  useEffect(() => {
    const currentPath = router.pathname;
    const currentQuery = { ...router.query };
    
    if (activeFilter === 'all') {
      delete currentQuery.filter;
    } else {
      currentQuery.filter = activeFilter;
    }
    
    router.replace({
      pathname: currentPath,
      query: currentQuery
    }, undefined, { shallow: true });
  }, [activeFilter]);

  // Options de filtrage
  const filterOptions = [
    { id: 'all', label: 'Tous' },
    { id: 'driver', label: 'Conducteur' },
    { id: 'passenger', label: 'Passager' },
    { id: 'upcoming', label: 'À venir' },
    { id: 'past', label: 'Passé' }
  ];

  // Fonction pour vérifier si un trajet est passé ou à venir
  const isPassedTrip = (trip: ExtendedTrip) => {
    const now = new Date();
    const [hours, minutes] = trip.arrivalTime.split(':').map(Number);
    const tripDate = new Date(trip.date);
    tripDate.setHours(hours, minutes, 0, 0);
    return tripDate < now;
  };

  // Fonction pour comparer deux dates avec leurs heures
  const compareDatesWithTime = (tripA: ExtendedTrip, tripB: ExtendedTrip) => {
    const dateA = new Date(tripA.date);
    const dateB = new Date(tripB.date);
    const [hoursA, minutesA] = tripA.arrivalTime.split(':').map(Number);
    const [hoursB, minutesB] = tripB.arrivalTime.split(':').map(Number);
    
    dateA.setHours(hoursA, minutesA, 0, 0);
    dateB.setHours(hoursB, minutesB, 0, 0);
    
    // Pour les trajets à venir, on trie du plus proche au plus lointain
    if (activeFilter === 'upcoming') {
      return dateA.getTime() - dateB.getTime();
    }
    
    // Pour les autres cas (passés ou tous), on garde le tri du plus récent au plus ancien
    return dateB.getTime() - dateA.getTime();
  };

  // Fonction pour trier les trajets par date et heure
  const sortTripsByDateTime = (trips: ExtendedTrip[]) => {
    return [...trips].sort(compareDatesWithTime);
  };

  // Fonction pour vérifier si un trajet nécessite une action
  const checkIfTripNeedsAction = (trip: Trip) => {
    const isDriver = trip.userId === userId;
    const passengerRequest = trip.requests?.find(r => r.userId === userId && r.status === 'accepted');
    
    // Si le trajet est terminé, vérifier si une notation est nécessaire
    if (trip.status === 'completed') {
      if (isDriver) {
        return !trip.isDriverConfirmed;
      } else if (passengerRequest) {
        return !passengerRequest.isCompleted;
      }
    }
    
    // Si le trajet n'est pas terminé mais est passé (basé sur l'heure d'arrivée), il nécessite une confirmation
    const now = new Date();
    const [hours, minutes] = trip.arrivalTime.split(':').map(Number);
    const tripDate = new Date(trip.date);
    tripDate.setHours(hours, minutes, 0, 0);
    
    if (tripDate < now && trip.status === 'active') {
      return true;
    }
    
    return false;
  };

  // Fonction pour filtrer les trajets
  const filterTrips = (trips: ExtendedTrip[]) => {
    let filteredTrips = [...trips];
    const now = new Date();

    // D'abord, identifions les trajets passés (heure d'arrivée dépassée ou status completed)
    const isPastTrip = (trip: ExtendedTrip) => {
      // Si le status est completed, c'est forcément un trajet passé
      if (trip.status === 'completed') {
        return true;
      }
      
      // Sinon, vérifier si la date/heure d'arrivée est dépassée
      const [hours, minutes] = trip.arrivalTime.split(':').map(Number);
      const tripDate = new Date(trip.date);
      tripDate.setHours(hours, minutes, 0, 0);
      return tripDate < now;
    };

    console.log(`Filtrage: ${activeFilter} - ${trips.length} trajets au total`);
    
    // Filtrage en fonction du type sélectionné
    switch (activeFilter) {
      case 'driver':
        // Trajets où l'utilisateur est conducteur, mais PAS les trajets passés
        filteredTrips = filteredTrips.filter(trip => {
          const isPast = isPastTrip(trip);
          const isDriverRole = trip.userRole === 'driver';
          console.log(`Trajet ${trip._id} - driver filter: role=${trip.userRole}, isPast=${isPast}`);
          return isDriverRole && !isPast;
        });
        break;
        
      case 'passenger':
        // Trajets où l'utilisateur est passager, mais PAS les trajets passés
        filteredTrips = filteredTrips.filter(trip => {
          const isPast = isPastTrip(trip);
          const isPassengerRole = trip.userRole === 'passenger';
          console.log(`Trajet ${trip._id} - passenger filter: role=${trip.userRole}, isPast=${isPast}`);
          return isPassengerRole && !isPast;
        });
        break;
        
      case 'upcoming':
        // Tous les trajets à venir (peu importe le rôle)
        filteredTrips = filteredTrips.filter(trip => {
          const isPast = isPastTrip(trip);
          console.log(`Trajet ${trip._id} - upcoming filter: isPast=${isPast}`);
          return !isPast;
        });
        break;
        
      case 'past':
        // Tous les trajets passés (peu importe le rôle)
        filteredTrips = filteredTrips.filter(trip => {
          const isPast = isPastTrip(trip);
          console.log(`Trajet ${trip._id} - past filter: isPast=${isPast}, status=${trip.status}, needsRating=${trip.needsRating}`);
          return isPast;
        });
        break;
        
      case 'all':
        // Pas de filtrage supplémentaire
        break;
    }

    console.log(`Après filtrage: ${filteredTrips.length} trajets`);

    // Trier les trajets passés : ceux qui nécessitent une notation en premier
    if (activeFilter === 'past' || activeFilter === 'all') {
      filteredTrips.sort((a, b) => {
        // Priorité aux trajets qui nécessitent une notation
        if (a.needsRating && !b.needsRating) return -1;
        if (!a.needsRating && b.needsRating) return 1;
        
        // Ensuite par date (du plus récent au plus ancien)
        return 0;
      });
    }

    // Trier par date
    return sortTripsByDateTime(filteredTrips);
  };

  // Fonction pour gérer la complétion d'un trajet
  const handleTripComplete = async (tripId: string) => {
    try {
      await tripService.confirmTripPickup(tripId);
      toast.success('Trajet confirmé avec succès!');
      await fetchTrips(); // Attendre le rafraîchissement
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Erreur lors de la confirmation du trajet');
      }
    }
  };

  // Fonction pour ouvrir la modal de notation
  const handleOpenRatingModal = (trip: Trip) => {
    setSelectedTrip(trip);
    setShowRatingModal(true);
  };

  // Fonction pour confirmer la prise en charge
  const handleConfirmPickup = async (tripId: string) => {
    try {
      await tripService.confirmPickupAsPassenger(tripId);
      toast.success('Prise en charge confirmée avec succès!');
      await fetchTrips(); // Attendre le rafraîchissement
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Erreur lors de la confirmation de la prise en charge');
      }
    }
  };

  // Function pour rafraîchir les trajets
  const fetchTrips = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔄 Rafraîchissement des trajets...');
      const response = await tripService.getMyTrips();
      
      // Assurer que response.currentTrips et response.historicTrips sont des tableaux
      const currentTrips = Array.isArray(response.currentTrips) ? response.currentTrips : [];
      const historicTrips = Array.isArray(response.historicTrips) ? response.historicTrips : [];

      // Vérification des trajets historiques qui nécessitent une notation
      console.log('------- Trajets historiques après rafraîchissement -------');
      historicTrips.forEach(trip => {
        console.log(`Trajet ${trip._id} - De ${trip.departure} à ${trip.arrival}`);
        console.log(`Status: ${trip.status}, userRole: ${trip.userRole}, needsRating: ${trip.needsRating}`);
        if (trip.userRole === 'driver') {
          console.log(`isDriverConfirmed: ${trip.isDriverConfirmed}`);
        } else if (trip.userRole === 'passenger') {
          const passengerRequest = trip.requests?.find((r: { userId: string, status: string, isCompleted?: boolean }) => 
            r.userId === userId && r.status === 'accepted');
          console.log(`Passager Request isCompleted: ${passengerRequest?.isCompleted}`);
        }
        console.log('----------------------------');
      });

      // Ajouter les propriétés isCurrent aux trajets
      const allTripsData: ExtendedTrip[] = [
        ...currentTrips.map((trip: any) => ({
          ...trip,
          isCurrent: true,
        })),
        ...historicTrips.map((trip: any) => ({
          ...trip,
          isCurrent: false,
        }))
      ];

      console.log('Trajets récupérés après rafraîchissement:', allTripsData.length);
      setAllTrips(allTripsData);
      return true;
    } catch (err) {
      console.error('Erreur lors du chargement des trajets:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Une erreur est survenue lors du chargement des trajets');
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  if (loading || !user) {
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

  const handleRequestJoin = async (tripId: string) => {
    try {
      await tripService.requestToJoin(tripId);
      toast.success('Demande envoyée avec succès!');
      await fetchTrips(); // Attendre le rafraîchissement
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Erreur lors de l\'envoi de la demande');
      }
    }
  };

  const handleAcceptRequest = async (tripId: string, requestUserId: string) => {
    try {
      await tripService.acceptRequest(tripId, requestUserId);
      toast.success('Demande acceptée avec succès!');
      await fetchTrips(); // Attendre le rafraîchissement
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Erreur lors de l\'acceptation de la demande');
      }
    }
  };

  const handleRejectRequest = async (tripId: string, requestUserId: string) => {
    try {
      await tripService.rejectRequest(tripId, requestUserId);
      toast.success('Demande refusée');
      await fetchTrips(); // Attendre le rafraîchissement
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Erreur lors du refus de la demande');
      }
    }
  };

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
              onClick={() => setActiveFilter(filter.id as 'all' | 'driver' | 'passenger' | 'upcoming' | 'past')}
            />
          ))}
        </div>
        
        <div className="space-y-8">
          <section>
            {filteredTrips.length === 0 ? (
              <p style={{ color: colors.components.titre.text.highlight }}>Aucun trajet trouvé</p>
            ) : (
              <div className="space-y-4">
                {filteredTrips.map(trip => (
                  <TrajetItem 
                    key={trip._id} 
                    trip={trip} 
                    onUpdate={fetchTrips}
                    onOpenRatingModal={handleOpenRatingModal}
                    onTripComplete={handleTripComplete}
                    onConfirmPickup={handleConfirmPickup}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Modal de notation */}
      {selectedTrip && (
        <TripRatingModal
          trip={selectedTrip}
          isOpen={showRatingModal}
          onClose={() => {
            setShowRatingModal(false);
            setSelectedTrip(null);
          }}
          isDriver={selectedTrip.userRole === 'driver'}
          onUpdate={fetchTrips}
        />
      )}

      <NavBar activePage="trips" />
    </div>
  );
}