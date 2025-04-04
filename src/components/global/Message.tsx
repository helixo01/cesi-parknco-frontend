import React, { useState } from 'react';
import { ProfilPic } from './ProfilPic';
import { Division } from './Division';
import PopUpMessage from './PopUpMessage';

interface MessageProps {
  userName: string;
  userImage?: string;
  from: string;
  to: string;
  date: string;
  time: string;
}

// Exemple de test avec un long prénom
const TestMessage = () => {
  return (
    <Message
      userName="Jean-Christophe-Marie-Emmanuel-Alexandre-Maximilien-François-Antoine de Saint-Exupéry de la Rochefoucauld"
      from="123 Avenue des Champs-Élysées, 75008 Paris, France, Bâtiment B, 3ème étage, Porte droite"
      to="456 Boulevard de la République, 69001 Lyon, France, Résidence Les Magnolias, Entrée A, 5ème étage"
      date="Vendredi 15 Décembre 2023"
      time="14h30"
    />
  );
};

const Message: React.FC<MessageProps> = ({
  userName,
  userImage = "https://ui-avatars.com/api/?name=" + encodeURIComponent(userName) + "&background=0D8ABC&color=fff",
  from,
  to,
  date,
  time,
}) => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const handleAccept = () => {
    console.log('Trajet accepté');
    setIsPopUpOpen(false);
  };

  const handleRefuse = () => {
    console.log('Trajet refusé');
    setIsPopUpOpen(false);
  };

  return (
    <>
      <div onClick={() => setIsPopUpOpen(true)} className="cursor-pointer">
        <Division variant="default" className="p-2">
          <div className="bg-[#1A2D3E] rounded-lg p-4 w-full max-w-xl">
            <div className="flex gap-4">
              {/* Photo de profil et nom */}
              <div className="flex flex-col items-center min-w-[80px]">
                <ProfilPic
                  src={userImage}
                  alt={userName}
                  width={65}
                  height={65}
                />
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
                </div>
              </div>
            </div>
          </div>
        </Division>
      </div>

      {/* PopUp Modal */}
      {isPopUpOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <PopUpMessage
              userName={userName}
              userImage={userImage}
              from={from}
              to={to}
              date={date}
              time={time}
              onAccept={handleAccept}
              onRefuse={handleRefuse}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Message; 