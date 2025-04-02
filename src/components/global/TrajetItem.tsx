import React from 'react';
import { colors } from "@/styles/colors";
import { FaCalendarAlt, FaFlagCheckered, FaCheckCircle, FaClock } from 'react-icons/fa';

interface TrajetItemProps {
  // departure: string;
  departure: string;
  // arrival: string;
  arrival: string;
  // date: Date;
  date: Date;
  ETA: Date;
  ETD: Date;
  status: string;
}

const TrajetItem: React.FC<TrajetItemProps> = ({ departure, arrival, date, ETA, ETD, status }) => {
  const formattedDate = new Date(date).toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formattedTime = new Date(ETA).toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const formattedDepartureTime = new Date(ETD).toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  });

  // Fonction pour déterminer l'icône en fonction du statut
  const getStatusIcon = () => {
    switch (status.toLowerCase()) {
      case 'terminé':
        return <FaFlagCheckered className="text-xl" style={{ color: colors.components.header.arrow }} />;
      case 'confirmé':
        return <FaCheckCircle className="text-xl" style={{ color: colors.components.header.arrow }} />;
      case 'en attente':
        return <FaClock className="text-xl" style={{ color: colors.components.header.arrow }} />;
      default:
        return <FaClock className="text-xl" style={{ color: colors.components.header.arrow }} />;
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow relative" style={{ backgroundColor: colors.background.default }}>
      {/* Icône de statut en haut à droite */}
      <div className="absolute top-4 right-4">
        {getStatusIcon()}
      </div>

      <div className="flex flex-col space-y-3">
        {/* En-tête avec la date */}
        <div className="flex items-center gap-2 text-sm" style={{ color: colors.components.titre.text.highlight }}>
          <FaCalendarAlt className="text-lg" />
          {formattedDate}
        </div>

        {/* Informations du trajet */}
        <div className="flex items-center justify-between">
          {/* Point de départ */}
          <div className="flex flex-col items-center">
            <div className="font-semibold text-lg">{departure}</div>
            <div className="text-sm">Départ</div>
            <div className="text-sm" style={{ color: colors.components.titre.text.highlight }}>
              ETD: {formattedDepartureTime}
            </div>
          </div>

          {/* Ligne horizontale de trajet avec points */}
          <div className="relative h-0.5 w-32">
            {/* Point de gauche */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-primary-main rounded-full" style={{ backgroundColor: colors.components.header.arrow }}></div>
            
            {/* Ligne principale */}
            <div className="absolute inset-0 bg-primary-main" style={{backgroundColor: colors.components.header.arrow}}></div>
            
            {/* Point de droite */}
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-primary-main rounded-full" style={{ backgroundColor: colors.components.header.arrow }}></div>
          </div>

          {/* Point d'arrivée */}
          <div className="flex flex-col items-center">
            <div className="font-semibold text-lg">{arrival}</div>
            <div className="text-sm">Arrivée</div>
            <div className="text-sm" style={{ color: colors.components.titre.text.highlight }}>
              ETA: {formattedTime}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrajetItem; 