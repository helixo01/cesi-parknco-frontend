import React, { useState, useEffect } from 'react';
import { colors } from '@/styles/colors';
import { Trip, TripRequest } from '@/types/trip';
import { Modal } from '@/components/global/Modal';
import { FaStar, FaCheck, FaUser } from 'react-icons/fa';
import { tripService } from '@/services/tripService';
import { toast } from 'react-hot-toast';
import { userService } from '@/services/userService';

interface TripRatingModalProps {
  trip: Trip;
  isOpen: boolean;
  onClose: () => void;
  isDriver: boolean;
  onUpdate: () => void;
}

interface PassengerRating {
  userId: string;
  rating: number;
  firstName: string;
  lastName: string;
  isConfirmed: boolean;
}

interface DriverInfo {
  firstName: string;
  lastName: string;
}

export const TripRatingModal: React.FC<TripRatingModalProps> = ({
  trip,
  isOpen,
  onClose,
  isDriver,
  onUpdate
}) => {
  const [driverRating, setDriverRating] = useState(0);
  const [driverHover, setDriverHover] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPickupConfirmed, setIsPickupConfirmed] = useState(false);
  const [driverInfo, setDriverInfo] = useState<DriverInfo | null>(null);
  const [passengerRatings, setPassengerRatings] = useState<PassengerRating[]>(
    trip.requests
      ?.filter(r => r.status === 'accepted')
      .map(r => ({
        userId: r.userId,
        rating: 0,
        firstName: '',
        lastName: '',
        isConfirmed: false
      })) || []
  );

  // Charger les informations des passagers si l'utilisateur est conducteur
  useEffect(() => {
    if (isDriver && isOpen && passengerRatings.length > 0) {
      const fetchPassengerInfo = async () => {
        try {
          const updatedPassengers = [...passengerRatings];
          
          for (let i = 0; i < updatedPassengers.length; i++) {
            const passenger = updatedPassengers[i];
            try {
              const passengerInfo = await userService.getUserById(passenger.userId);
              updatedPassengers[i] = {
                ...passenger,
                firstName: passengerInfo.firstName || 'Utilisateur',
                lastName: passengerInfo.lastName || ''
              };
            } catch (error) {
              console.error(`Erreur lors de la récupération des informations du passager ${passenger.userId}:`, error);
            }
          }
          
          setPassengerRatings(updatedPassengers);
        } catch (error) {
          console.error('Erreur lors de la récupération des informations des passagers:', error);
        }
      };
      
      fetchPassengerInfo();
    }
  }, [isDriver, isOpen, passengerRatings.length]);

  // Charger les informations du conducteur si l'utilisateur est passager
  useEffect(() => {
    if (!isDriver && isOpen) {
      const fetchDriverInfo = async () => {
        try {
          const driver = await userService.getUserById(trip.userId);
          setDriverInfo({
            firstName: driver.firstName || '',
            lastName: driver.lastName || ''
          });
        } catch (error) {
          console.error('Erreur lors de la récupération des informations du conducteur:', error);
          setDriverInfo({
            firstName: 'Conducteur',
            lastName: ''
          });
        }
      };
      
      fetchDriverInfo();
    }
  }, [isDriver, isOpen, trip.userId]);

  const handlePassengerRatingChange = (userId: string, rating: number) => {
    setPassengerRatings(prev =>
      prev.map(p =>
        p.userId === userId ? { ...p, rating } : p
      )
    );
  };

  const handlePassengerConfirmation = (userId: string, isConfirmed: boolean) => {
    setPassengerRatings(prev =>
      prev.map(p =>
        p.userId === userId ? { ...p, isConfirmed } : p
      )
    );
  };

  const canSubmit = () => {
    if (isDriver) {
      // Le conducteur doit confirmer la prise en charge ET/OU donner une note
      const hasRating = passengerRatings.some(p => p.rating > 0);
      return isPickupConfirmed || hasRating;
    } else {
      // Le passager doit confirmer la prise en charge ET/OU donner une note
      return isPickupConfirmed || driverRating > 0;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (isDriver) {
        // Pour chaque passager qui a une note
        for (const passenger of passengerRatings) {
          if (passenger.rating > 0) {
            try {
              console.log('Notation et confirmation du passager en cours...', passenger);
              await tripService.rateAndCompleteAsDriver(trip._id, passenger.userId, passenger.rating);
              console.log('Notation et confirmation du passager réussies');
            } catch (error) {
              console.error('Erreur lors de la notation du passager:', error);
              throw error;
            }
          }
        }
        toast.success('Notes enregistrées avec succès !');
      } else {
        // Pour le passager qui note le conducteur
        if (driverRating > 0) {
          try {
            console.log('Notation et confirmation du conducteur en cours...');
            await tripService.rateDriver(trip._id, driverRating);
            console.log('Notation et confirmation du conducteur réussies');
            toast.success('Note enregistrée avec succès !');
          } catch (error) {
            console.error('Erreur lors de la notation du conducteur:', error);
            throw error;
          }
        }
      }
      
      // Rafraîchir les trajets après la notation
      await onUpdate();
      
      // Fermer la modal
      onClose();
      
      // Forcer un rechargement de la page pour être sûr que tout est à jour
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Une erreur est survenue');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-[#0A1D2E] p-6 rounded-xl text-white max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Trajet terminé !</h2>
        
        {/* Confirmation de prise en charge */}
        <div className="mb-6">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isPickupConfirmed}
              onChange={(e) => setIsPickupConfirmed(e.target.checked)}
              className="form-checkbox h-5 w-5 text-green-500"
            />
            <span>
              {isDriver 
                ? "Je confirme avoir pris en charge tous les passagers" 
                : "Je confirme avoir été pris en charge par le conducteur"}
            </span>
          </label>
        </div>

        {isDriver ? (
          // Interface conducteur : noter chaque passager
          <div className="space-y-6">
            <h3 className="text-lg font-medium mb-4">Noter vos passagers :</h3>
            {passengerRatings.length > 0 ? (
              passengerRatings.map((passenger) => (
                <div key={passenger.userId} className="space-y-4 mb-6">
                  <div className="font-medium mb-4 flex items-center justify-center gap-2 border border-gray-700 p-3 rounded-lg">
                    <FaUser className="text-blue-400" />
                    <span>{passenger.firstName} {passenger.lastName}</span>
                  </div>
                  
                  <div className="flex justify-center space-x-2 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className="cursor-pointer text-2xl"
                        style={{
                          color: passenger.rating >= star ? '#F59E0B' : '#6B7280'
                        }}
                        onClick={() => handlePassengerRatingChange(passenger.userId, star)}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-center text-gray-300">
                    {passenger.rating === 1 && "Très mauvais"}
                    {passenger.rating === 2 && "Mauvais"}
                    {passenger.rating === 3 && "Moyen"}
                    {passenger.rating === 4 && "Bien"}
                    {passenger.rating === 5 && "Excellent"}
                  </p>
                  {passengerRatings.length > 1 && <hr className="border-gray-700 my-4" />}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400">Aucun passager à noter</p>
            )}
          </div>
        ) : (
          // Interface passager : noter le conducteur
          <div className="space-y-4">
            <h3 className="text-lg font-medium mb-4">Noter votre conducteur :</h3>
            
            {driverInfo && (
              <div className="font-medium mb-4 flex items-center justify-center gap-2 border border-gray-700 p-3 rounded-lg">
                <FaUser className="text-blue-400" />
                <span>{driverInfo.firstName} {driverInfo.lastName}</span>
              </div>
            )}
            
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className="cursor-pointer text-2xl"
                  style={{
                    color: (driverHover || driverRating) >= star ? '#F59E0B' : '#6B7280'
                  }}
                  onClick={() => setDriverRating(star)}
                  onMouseEnter={() => setDriverHover(star)}
                  onMouseLeave={() => setDriverHover(0)}
                />
              ))}
            </div>
            <p className="text-sm text-center text-gray-300">
              {driverRating === 1 && "Très mauvais"}
              {driverRating === 2 && "Mauvais"}
              {driverRating === 3 && "Moyen"}
              {driverRating === 4 && "Bien"}
              {driverRating === 5 && "Excellent"}
            </p>
          </div>
        )}

        {/* Boutons d'action */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg"
            style={{ backgroundColor: colors.state.error + '99' }}
          >
            Plus tard
          </button>
          <button
            onClick={handleSubmit}
            disabled={!canSubmit() || isSubmitting}
            className="px-4 py-2 rounded-lg flex items-center space-x-2"
            style={{ 
              backgroundColor: colors.state.success + '99',
              opacity: (!canSubmit() || isSubmitting) ? 0.5 : 1
            }}
          >
            <FaCheck />
            <span>
              {isSubmitting ? 'Envoi...' : 'Confirmer et noter'}
            </span>
          </button>
        </div>
      </div>
    </Modal>
  );
}; 