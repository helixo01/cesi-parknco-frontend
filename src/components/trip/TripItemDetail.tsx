import React, { useState, useEffect } from 'react';
import { ProfilPic } from '@/components/global/ProfilPic';
import { Star } from '@/components/global/Star';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { HiOutlineUserAdd } from 'react-icons/hi';
import PopUpConfirmation from '@/components/global/PopUpConfirmation';
import { tripService } from '@/services/tripService';
import { userService } from '@/services/userService';
import { toast } from 'react-hot-toast';

interface UserInfo {
  firstName: string;
  lastName: string;
  profilePicture?: string | null;
}

interface TripItemDetailProps {
  id: string;
  startDate: Date;
  startTime: string;
  endTime: string;
  from: string;
  fromAddress: string;
  to: string;
  toAddress: string;
  duration: string;
  userId: string;
  rating: number;
  onRequestSent?: () => void;
}

const TripItemDetail: React.FC<TripItemDetailProps> = ({
  id,
  startDate,
  startTime,
  endTime,
  from,
  fromAddress,
  to,
  toAddress,
  duration,
  userId,
  rating,
  onRequestSent
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await userService.getUserById(userId);
        setUserData({
          firstName: data.firstName,
          lastName: data.lastName,
          profilePicture: data.profilePicture || null
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
        setUserData({
          firstName: 'Conducteur',
          lastName: '',
          profilePicture: null
        });
      }
    };

    fetchUserData();
  }, [userId]);

  const handlePostuler = () => {
    if (isLoading) return;
    setIsPopupOpen(true);
  };

  const handleAccept = async () => {
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      await tripService.requestToJoin(id);
      setIsPopupOpen(false);
      
      if (onRequestSent) {
        onRequestSent();
      }

      toast('Votre demande a bien été envoyée au conducteur', {
        duration: 3000,
        icon: '✅'
      });

    } catch (error: any) {
      setIsPopupOpen(false);
      
      let errorMessage = 'Une erreur est survenue';
      
      if (error instanceof Error) {
        const message = error.message.toLowerCase();
        if (message.includes('déjà') || message.includes('already')) {
          errorMessage = 'Vous avez déjà envoyé une demande pour ce trajet';
        }
      }

      toast(errorMessage, {
        duration: 3000,
        icon: '❌'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formattedDate = startDate.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <>
      <div className="bg-[#0A1D2E] text-white rounded-xl p-6 shadow-md w-full">
        {/* Date en haut à gauche avec icône */}
        <div className="text-sm font-semibold mb-6 flex items-center gap-2">
          <FaRegCalendarAlt className="text-gray-400 text-base" />
          {formattedDate}
        </div>

        <div className="flex justify-between gap-8">
          {/* Partie trajet au centre */}
          <div className="flex-1 flex flex-col items-center">
            <div className="flex flex-col items-center space-y-4 w-full max-w-sm">
              <span className="text-sm">{startTime}</span>
              <div className="flex flex-col items-center w-full">
                <span className="text-xl font-semibold mb-2">{from}</span>
                <div className="bg-[#1A2D3E] rounded-lg p-3 w-full min-h-[60px] flex items-center justify-center">
                  <span className="text-sm text-gray-400 text-center">
                    {fromAddress}
                  </span>
                </div>
              </div>
              <div className="h-10 border-l-2 border-gray-400"></div>
              <span className="text-sm font-medium">{duration}</span>
              <div className="h-10 border-l-2 border-gray-400"></div>
              <span className="text-sm">{endTime}</span>
              <div className="flex flex-col items-center w-full">
                <span className="text-xl font-semibold mb-2">{to}</span>
                <div className="bg-[#1A2D3E] rounded-lg p-3 w-full min-h-[60px] flex items-center justify-center">
                  <span className="text-sm text-gray-400 text-center">
                    {toAddress}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Partie profil à droite */}
          <div className="flex flex-col items-center justify-center space-y-4 min-w-[140px] h-full py-16">
            <ProfilPic
              src={userData?.profilePicture || null}
              alt={userData ? `${userData.firstName} ${userData.lastName}` : 'Photo de profil'}
              className="w-16 h-16"
            />
            <span className="text-sm text-center">
              {userData ? `${userData.firstName} ${userData.lastName}` : 'Chargement...'}
            </span>
            <Star rating={rating} />
            {/* Bouton Postuler */}
            <button 
              onClick={handlePostuler}
              disabled={isLoading}
              className="border-2 border-green-500 rounded-lg px-6 py-3 flex flex-col items-center hover:bg-green-700 hover:border-green-700 transition-colors min-w-[120px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <HiOutlineUserAdd className="text-2xl text-green-500 mb-1" />
              <span className="text-sm text-green-500 font-medium">
                {isLoading ? 'Envoi...' : 'Postuler'}
              </span>
            </button>
          </div>
        </div>
      </div>

      <PopUpConfirmation
        isOpen={isPopupOpen}
        message={`Voulez-vous postuler pour le trajet ${from} - ${to} ?`}
        onCancel={() => setIsPopupOpen(false)}
        onAccept={handleAccept}
      />
    </>
  );
};

export default TripItemDetail; 