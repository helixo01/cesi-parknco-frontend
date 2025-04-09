import React from 'react';
import { Trip } from '@/types/trip';
import { colors } from '@/styles/colors';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useAuth } from '@/hooks/useAuth';

interface TripCardProps {
  trip: Trip;
  onTripComplete?: (tripId: string) => void;
  onOpenRatingModal?: (trip: Trip) => void;
  onConfirmPickup?: (tripId: string) => void;
}

export const TripCard: React.FC<TripCardProps> = ({ 
  trip,
  onTripComplete,
  onOpenRatingModal,
  onConfirmPickup
}) => {
  const { user } = useAuth();
  const userId = user?.id;
  const isDriver = trip.userRole === 'driver';
  const passengerRequest = trip.requests?.find(r => 
    r.userId === userId && 
    r.status === 'accepted'
  );

  // Fonctions de gestion des actions
  const handleTripComplete = (tripId: string) => {
    if (onTripComplete) {
      onTripComplete(tripId);
    } else {
      console.error("Fonction onTripComplete non définie");
    }
  };

  const handleOpenRatingModal = (trip: Trip) => {
    if (onOpenRatingModal) {
      onOpenRatingModal(trip);
    } else {
      console.error("Fonction onOpenRatingModal non définie");
    }
  };

  const handleConfirmPickup = (tripId: string) => {
    if (onConfirmPickup) {
      onConfirmPickup(tripId);
    } else {
      console.error("Fonction onConfirmPickup non définie");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 space-y-3" style={{ borderColor: colors.primary.main }}>
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{trip.departure} → {trip.arrival}</h3>
          <p className="text-sm text-gray-600">
            {format(new Date(trip.date), 'dd MMMM yyyy', { locale: fr })} à {trip.time}
          </p>
        </div>
        <div className="text-right">
          <div className="flex flex-col items-end space-y-2">
            <span className="text-sm text-gray-600">
              {isDriver ? 'Conducteur' : 'Passager'}
            </span>
            <span className="text-sm text-gray-600">
              {trip.vehicle || 'Non spécifié'}
            </span>
            <span className={`px-2 py-1 rounded ${
              trip.status === 'active' ? 'bg-green-100 text-green-700' :
              trip.status === 'completed' ? 'bg-gray-100 text-gray-700' :
              trip.status === 'cancelled' ? 'bg-red-100 text-red-700' :
              'bg-yellow-100 text-yellow-700'
            }`}>
              {trip.status === 'active' ? 'Actif' :
               trip.status === 'completed' ? 'Terminé' :
               trip.status === 'cancelled' ? 'Annulé' :
               'En attente'}
            </span>
          </div>
        </div>
      </div>

      {/* Actions en fonction du rôle */}
      {isDriver ? (
        <div className="flex justify-end space-x-2">
          {/* Actions pour le conducteur */}
          {trip.status === 'active' && !trip.isDriverConfirmed && (
            <button
              onClick={() => handleTripComplete(trip._id)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Confirmer le trajet
            </button>
          )}
          {trip.status === 'completed' && !trip.isDriverConfirmed && (
            <button
              onClick={() => handleOpenRatingModal(trip)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Noter les passagers
            </button>
          )}
        </div>
      ) : passengerRequest ? (
        <div className="flex justify-end space-x-2">
          {/* Actions pour le passager */}
          {trip.status === 'active' && !passengerRequest.isCompleted && (
            <button
              onClick={() => handleConfirmPickup(trip._id)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Confirmer la prise en charge
            </button>
          )}
          {trip.status === 'completed' && !passengerRequest.isCompleted && (
            <button
              onClick={() => handleOpenRatingModal(trip)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Noter le conducteur
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
};
