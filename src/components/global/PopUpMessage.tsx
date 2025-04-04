import React from 'react';
import { ProfilPic } from './ProfilPic';
import { Division } from './Division';
import { Star } from './Star';

interface PopUpMessageProps {
  userName: string;
  userImage?: string | null;
  from: string;
  to: string;
  date: string;
  time: string;
  onAccept?: () => void;
  onRefuse?: () => void;
  status?: 'pending' | 'accepted' | 'rejected';
}

const PopUpMessage: React.FC<PopUpMessageProps> = ({
  userName,
  userImage,
  from,
  to,
  date,
  time,
  onAccept,
  onRefuse,
  status
}) => {
  return (
    <Division variant="default" className="p-2">
      <div className="bg-[#1A2D3E] rounded-lg p-4 w-full max-w-xl">
        <div className="flex flex-col space-y-6">
          {/* Photo de profil, étoiles et nom */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20">
              <ProfilPic
                src={userImage}
                alt={userName}
                width={80}
                height={80}
              />
            </div>
            <div className="mt-3">
              <Star rating={4.5} className="text-xl" />
            </div>
            <span className="text-base text-white mt-2 font-medium">
              {userName}
            </span>
          </div>

          {/* Ligne de séparation */}
          <div className="border-t border-gray-700 w-full"></div>

          {/* Informations du trajet */}
          <div className="space-y-4 w-full">
            {/* Section départ */}
            <div className="flex flex-col bg-[#0A1D2E] rounded-lg p-3">
              <span className="text-xs text-gray-400 mb-1">De</span>
              <span className="text-sm text-white break-words font-medium leading-tight">{from}</span>
            </div>

            {/* Section arrivée */}
            <div className="flex flex-col bg-[#0A1D2E] rounded-lg p-3">
              <span className="text-xs text-gray-400 mb-1">À</span>
              <span className="text-sm text-white break-words font-medium leading-tight">{to}</span>
            </div>

            {/* Section date et heure */}
            <div className="flex flex-col bg-[#0A1D2E] rounded-lg p-3">
              <span className="text-xs text-gray-400 mb-1">Date et Heure</span>
              <div className="flex flex-col space-y-1">
                <span className="text-sm text-white font-medium leading-tight">{date}</span>
                <span className="text-sm text-white font-medium leading-tight">{time}</span>
              </div>
            </div>

            {/* Statut de la demande */}
            {status && (
              <div className="flex justify-center mt-2">
                <span className={`inline-block px-4 py-1.5 rounded-lg font-medium text-sm ${
                  status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                  status === 'accepted' ? 'bg-green-500/20 text-green-500' :
                  'bg-red-500/20 text-red-500'
                }`}>
                  {status === 'pending' ? 'En attente' :
                   status === 'accepted' ? 'Acceptée' :
                   'Refusée'}
                </span>
              </div>
            )}

            {/* Boutons d'action */}
            {onAccept && onRefuse && (
              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={onRefuse}
                  className="px-6 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors"
                >
                  Refuser
                </button>
                <button
                  onClick={onAccept}
                  className="px-6 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium transition-colors"
                >
                  Accepter
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Division>
  );
};

export default PopUpMessage; 