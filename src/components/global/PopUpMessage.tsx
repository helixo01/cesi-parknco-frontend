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
    <Division variant="default" className="p-4">
      <div className="bg-[#1A2D3E] rounded-xl p-6 w-full max-w-[400px] mx-auto">
        <div className="flex flex-col items-center space-y-5">
          {/* Photo de profil, étoiles et nom */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 mb-3">
              <ProfilPic
                src={userImage}
                alt={userName}
                width={96}
                height={96}
              />
            </div>
            <div className="mb-2">
              <Star rating={4.5} className="text-xl" />
            </div>
            <span className="text-xl text-white font-medium">
              {userName}
            </span>
          </div>

          {/* Ligne de séparation */}
          <div className="border-t border-gray-700 w-full"></div>

          {/* Informations du trajet */}
          <div className="w-full space-y-3">
            {/* Section départ */}
            <div className="flex flex-col bg-[#0A1D2E] rounded-xl p-3">
              <span className="text-sm text-gray-400 mb-1">De</span>
              <span className="text-lg text-white font-medium">{from}</span>
            </div>

            {/* Section arrivée */}
            <div className="flex flex-col bg-[#0A1D2E] rounded-xl p-3">
              <span className="text-sm text-gray-400 mb-1">À</span>
              <span className="text-lg text-white font-medium">{to}</span>
            </div>

            {/* Section date et heure */}
            <div className="flex flex-col bg-[#0A1D2E] rounded-xl p-3">
              <span className="text-sm text-gray-400 mb-1">Date et Heure</span>
              <div className="flex flex-col">
                <span className="text-lg text-white font-medium">{date}</span>
                <span className="text-lg text-white font-medium">{time}</span>
              </div>
            </div>

            {/* Statut de la demande */}
            {status && (
              <div className="flex justify-center mt-3">
                <span className={`inline-block px-6 py-2 rounded-xl font-medium text-base ${
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
              <div className="flex justify-between mt-4">
                <button
                  onClick={onRefuse}
                  className="w-[48%] py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition-colors text-base"
                >
                  Refuser
                </button>
                <button
                  onClick={onAccept}
                  className="w-[48%] py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-white font-medium transition-colors text-base"
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