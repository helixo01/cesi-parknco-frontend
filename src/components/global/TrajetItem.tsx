import React, { useState, useEffect } from 'react';
import { colors } from "@/styles/colors";
import { FaCalendarAlt, FaFlagCheckered, FaClock, FaCheck, FaStar, FaExclamationCircle } from 'react-icons/fa';
import { Trip, TripConfirmation, TripRating } from '@/types/trip';
import { TripRatingModal } from '@/components/trip/TripRatingModal';
import { tripService } from '@/services/tripService';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';

interface TrajetItemProps {
  trip: Trip;
  onUpdate?: () => void;
  onOpenRatingModal?: (trip: Trip) => void; 
  onTripComplete?: (tripId: string) => void;
  onConfirmPickup?: (tripId: string) => void;
}

const TrajetItem: React.FC<TrajetItemProps> = ({ 
  trip, 
  onUpdate,
  onOpenRatingModal, 
  onTripComplete,
  onConfirmPickup 
}) => {
  const { user } = useAuth();
  const userId = user?.id;
  const [showRatingModal, setShowRatingModal] = useState(false);
  const isDriver = trip.userId === userId;
  const passengerRequest = trip.requests?.find(r => r.userId === userId && r.status === 'accepted');
  const [isArrivalPassed, setIsArrivalPassed] = useState(false);

  // Debug du rôle de l'utilisateur
  useEffect(() => {
    console.log(`Trajet ${trip._id} - Rôle utilisateur:`);
    console.log(`UserId connecté: ${userId}`);
    console.log(`UserId du conducteur: ${trip.userId}`);
    console.log(`Est conducteur? ${isDriver}`);
    console.log(`Trip userRole from backend: ${trip.userRole}`);
    
    if (trip.requests) {
      const request = trip.requests.find(r => r.userId === userId);
      console.log(`Requête trouvée: ${request ? 'Oui' : 'Non'}`);
      if (request) {
        console.log(`Status de la requête: ${request.status}`);
      }
    }
  }, [trip, userId]);

  // Vérifier si l'heure d'arrivée est passée
  useEffect(() => {
    const now = new Date();
    const tripDate = new Date(trip.date);
    const [arrivalHours, arrivalMinutes] = trip.arrivalTime.split(':').map(Number);
    tripDate.setHours(arrivalHours, arrivalMinutes, 0, 0);
    setIsArrivalPassed(tripDate < now);
  }, [trip]);

  const formattedDate = new Date(trip.date).toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formattedTime = trip.time || "Non spécifié";

  // Vérifie si le trajet nécessite une notation
  const needsRating = () => {
    // Si le trajet n'est pas passé, pas besoin de notation
    const now = new Date();
    const tripDate = new Date(trip.date);
    const [arrivalHours, arrivalMinutes] = trip.arrivalTime.split(':').map(Number);
    tripDate.setHours(arrivalHours, arrivalMinutes, 0, 0);
    const isPastTrip = tripDate < now || trip.status === 'completed';
    
    if (!isPastTrip) {
      return false;
    }

    // Pour un conducteur
    if (isDriver) {
      // Vérifier si le conducteur a déjà une confirmation et une note
      const hasConfirmation = trip.confirmations?.some(
        (c: TripConfirmation) => c.userId === userId && c.role === 'driver' && c.isConfirmed
      );
      const hasGivenRating = trip.ratings?.some(
        (r: TripRating) => r.fromUserId === userId && r.role === 'driver'
      );

      // Si le conducteur a déjà confirmé ET noté, pas besoin de notation
      if (hasConfirmation && hasGivenRating) {
        return false;
      }

      // Si le trajet n'a pas de passagers acceptés, pas besoin de notation
      const hasAcceptedPassengers = trip.requests?.some(r => r.status === 'accepted');
      if (!hasAcceptedPassengers) {
        return false;
      }

      return true;
    }
    
    // Pour un passager
    if (passengerRequest) {
      // Vérifier si le passager a déjà une confirmation et une note
      const hasConfirmation = trip.confirmations?.some(
        (c: TripConfirmation) => c.userId === userId && c.role === 'passenger' && c.isConfirmed
      );
      const hasGivenRating = trip.ratings?.some(
        (r: TripRating) => r.fromUserId === userId && r.role === 'passenger'
      );

      // Si le passager a déjà confirmé ET noté, pas besoin de notation
      if (hasConfirmation && hasGivenRating) {
        return false;
      }

      // Si la requête n'est pas acceptée, pas besoin de notation
      if (passengerRequest.status !== 'accepted') {
        return false;
      }

      return true;
    }
    
    return false;
  };

  // Gère l'ouverture de la modal de notation (local ou parent)
  const handleOpenRatingModal = () => {
    if (onOpenRatingModal) {
      onOpenRatingModal(trip);
    } else {
      setShowRatingModal(true);
    }
  };

  // Gère la complétion du trajet (local ou parent)
  const handleTripComplete = () => {
    if (onTripComplete) {
      onTripComplete(trip._id);
    } else {
      toast.error('Fonction de complétion non définie');
    }
  };

  // Gère la confirmation de prise en charge (local ou parent)
  const handleConfirmPickup = () => {
    if (onConfirmPickup) {
      onConfirmPickup(trip._id);
    } else {
      toast.error('Fonction de confirmation non définie');
    }
  };

  // Fonction pour déterminer l'icône en fonction du statut
  const getStatusIcon = () => {
    // Ajouter un indicateur visuel pour les trajets qui nécessitent une notation
    if (needsRating()) {
      return (
        <div className="flex items-center gap-2">
          <FaFlagCheckered className="text-xl" style={{ color: colors.components.titre.text.highlight }} />
        </div>
      );
    }
    
    if (trip.status === 'completed') {
      return <FaFlagCheckered className="text-xl" style={{ color: colors.components.titre.text.highlight }} />;
    }

    if (trip.availableSeats === 0) {
      return <FaCheck className="text-xl" style={{ color: colors.components.titre.text.highlight }} />;
    }
    
    return <FaClock className="text-xl" style={{ color: colors.components.titre.text.highlight }} />;
  };

  return (
    <>
      <div 
        className={`p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow relative ${needsRating() ? 'border-red-500 border-2' : ''}`}
        style={{ 
          backgroundColor: colors.background.default,
          opacity: (isDriver ? trip.isDriverConfirmed : passengerRequest?.isCompleted) ? 0.7 : 1
        }}
      >
        {/* Afficher un badge "Action requise" pour les trajets nécessitant une notation */}
        {needsRating() && (
          <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-bl-lg rounded-tr-lg">
            Action requise
          </div>
        )}
        
        <div className="flex flex-col space-y-3">
          {/* En-tête avec la date et l'icône de statut */}
          <div className="flex items-center justify-center gap-4 text-base font-medium" style={{ color: colors.components.titre.text.highlight }}>
            <FaCalendarAlt className="text-lg" />
            {formattedDate}
            {getStatusIcon()}
          </div>

          {/* Informations du trajet */}
          <div className="flex items-center justify-between">
            {/* Point de départ */}
            <div className="flex flex-col items-center">
              <div className="font-semibold text-lg" style={{ color: colors.text.white }}>{trip.departure}</div>
              <div className="text-sm flex items-center gap-2">
                <span style={{ color: colors.text.white }}>Départ :</span>
                <span style={{ color: colors.text.white }}>{formattedTime}</span>
              </div>
            </div>

            {/* Ligne horizontale de trajet avec points */}
            <div className="relative h-0.5 w-32">
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-primary-main rounded-full" style={{ backgroundColor: colors.text.white }}></div>
              <div className="absolute inset-0 bg-primary-main" style={{backgroundColor: colors.text.white}}></div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-primary-main rounded-full" style={{ backgroundColor: colors.text.white }}></div>
            </div>

            {/* Point d'arrivée */}
            <div className="flex flex-col items-center">
              <div className="font-semibold text-lg" style={{ color: colors.text.white }}>{trip.arrival}</div>
              <div className="text-sm flex items-center gap-2">
                <span style={{ color: colors.text.white }}>Arrivée :</span>
                <span style={{ color: colors.text.white }}>{trip.arrivalTime}</span>
              </div>
            </div>
          </div>

          {/* Places restantes centré */}
          <div className="text-sm flex items-center justify-center gap-2">
            <span style={{ color: colors.components.titre.text.highlight }}>Places restantes :</span>
            <span style={{ color: colors.components.titre.text.highlight }}>{trip.availableSeats}</span>
          </div>

          {/* Section des actions - n'apparaît que si le trajet nécessite une notation */}
          {needsRating() && (
            <div className="mt-3">
              {trip.userRole === 'driver' || (trip.userRole === undefined && isDriver) ? (
                <div className="flex justify-center space-x-2">
                  {/* Actions pour le conducteur */}
                  {!trip.isDriverConfirmed && (
                    <button
                      onClick={handleOpenRatingModal}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 w-full animate-pulse"
                    >
                      Noter les passagers
                    </button>
                  )}
                </div>
              ) : (
                <div className="flex justify-center space-x-2">
                  {/* Actions pour le passager */}
                  {passengerRequest && !passengerRequest.isCompleted && (
                    <button
                      onClick={handleOpenRatingModal}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 w-full animate-pulse"
                    >
                      Noter le conducteur
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Section de statut et actions */}
          <div className="mt-2 text-sm">
            {!needsRating() && isDriver ? (
              trip.isDriverConfirmed ? (
                <div className="text-green-400 text-center">Trajet terminé et noté</div>
              ) : null
            ) : (
              passengerRequest?.isCompleted && (
                <div className="flex items-center justify-center space-x-1">
                  <span className="text-green-400">Note donnée : </span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className="text-sm"
                      style={{
                        color: (passengerRequest.rating || 0) >= star ? '#FFB800' : '#4B5563'
                      }}
                    />
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Modal de notation locale (utilisée si onOpenRatingModal n'est pas fourni) */}
      {!onOpenRatingModal && (
        <TripRatingModal
          trip={trip}
          isOpen={showRatingModal}
          onClose={() => setShowRatingModal(false)}
          isDriver={trip.userRole === 'driver'} 
          onUpdate={onUpdate || (() => {})}
        />
      )}
    </>
  );
};

export default TrajetItem; 