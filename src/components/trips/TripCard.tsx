import React from 'react';
import { Trip } from '@/types/trip';
import { colors } from '@/styles/colors';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface TripCardProps {
  trip: Trip;
}

export const TripCard: React.FC<TripCardProps> = ({ trip }) => {
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
          <p className="text-sm text-gray-600">{trip.availableSeats} place{trip.availableSeats > 1 ? 's' : ''}</p>
        </div>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded">
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
  );
};
