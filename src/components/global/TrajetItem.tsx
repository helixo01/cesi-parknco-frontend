import React from 'react';
import { colors } from "@/styles/colors";
import { FaCalendarAlt, FaFlagCheckered, FaClock, FaCheck } from 'react-icons/fa';
import { Trip } from '@/types/trip';

interface TrajetItemProps {
  trip: Trip;
}

const TrajetItem: React.FC<TrajetItemProps> = ({ trip }) => {
  const formattedDate = new Date(trip.date).toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formattedTime = trip.time || "Non spécifié";
  const now = new Date();
  const [hours, minutes] = (trip.time || "00:00").split(":");
  const tripDate = new Date(trip.date);
  tripDate.setHours(parseInt(hours), parseInt(minutes));

  // Fonction pour déterminer l'icône en fonction du statut
  const getStatusIcon = () => {
    if (tripDate < now) {
      return <FaFlagCheckered className="text-xl" style={{ color: colors.components.titre.text.highlight }} />;
    }

    if (trip.availableSeats === 0) {
      return <FaCheck className="text-xl" style={{ color: colors.components.titre.text.highlight }} />;
    }
    
    return <FaClock className="text-xl" style={{ color: colors.components.titre.text.highlight }} />;
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow relative" style={{ backgroundColor: colors.background.default }}>
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
            {/* Point de gauche */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-primary-main rounded-full" style={{ backgroundColor: colors.text.white }}></div>
            
            {/* Ligne principale */}
            <div className="absolute inset-0 bg-primary-main" style={{backgroundColor: colors.text.white}}></div>
            
            {/* Point de droite */}
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
      </div>
    </div>
  );
};

export default TrajetItem; 