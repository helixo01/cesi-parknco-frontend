import React from 'react';
import { ProfilPic } from './ProfilPic';
import { Division } from './Division';
import { Star } from './Star';

interface PopUpMessageProps {
  userName: string;
  userImage?: string;
  from: string;
  to: string;
  date: string;
  time: string;
  onAccept: () => void;
  onRefuse: () => void;
}

const PopUpMessage: React.FC<PopUpMessageProps> = ({
  userName,
  userImage = "https://ui-avatars.com/api/?name=" + encodeURIComponent(userName) + "&background=0D8ABC&color=fff",
  from,
  to,
  date,
  time,
  onAccept,
  onRefuse,
}) => {
  return (
    <Division variant="default" className="p-2">
      <div className="bg-[#1A2D3E] rounded-lg p-4 w-full max-w-xl">
        <div className="flex gap-4">
          {/* Photo de profil, étoiles et nom */}
          <div className="flex flex-col items-center min-w-[80px]">
            <ProfilPic
              src={userImage}
              alt={userName}
              width={65}
              height={65}
            />
            <div className="mt-2">
              <Star rating={4.5} className="text-lg" />
            </div>
            <span className="text-sm text-white mt-2 text-center font-medium break-words w-full px-1">{userName}</span>
          </div>

          {/* Informations du trajet */}
          <div className="flex-1 min-w-0">
            <div className="space-y-3">
              {/* Section départ */}
              <div className="flex flex-col">
                <span className="text-xs text-white mb-1">De</span>
                <span className="text-base text-white break-words font-medium leading-tight">{from}</span>
              </div>

              {/* Section arrivée */}
              <div className="flex flex-col">
                <span className="text-xs text-white mb-1">À</span>
                <span className="text-base text-white break-words font-medium leading-tight">{to}</span>
              </div>

              {/* Section date */}
              <div className="flex flex-col">
                <span className="text-xs text-white mb-1">Date</span>
                <span className="text-base text-white font-medium leading-tight">{date}</span>
              </div>

              {/* Section heure */}
              <div className="flex flex-col">
                <span className="text-xs text-white mb-1">Heure</span>
                <span className="text-base text-white font-medium leading-tight">{time}</span>
              </div>

              {/* Boutons d'action */}
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
            </div>
          </div>
        </div>
      </div>
    </Division>
  );
};

export default PopUpMessage; 