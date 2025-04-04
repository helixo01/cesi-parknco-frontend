import React, { useState } from 'react';
import { Division } from './Division';
import PopUpMessage from './PopUpMessage';
import { colors } from '@/styles/colors';

type Status = 'pending' | 'accepted' | 'rejected';

interface MessageProps {
  userName: string;
  userImage?: string | null;
  from: string;
  to: string;
  date: string;
  time: string;
  status?: Status;
  onAccept?: () => void;
  onReject?: () => void;
  showActions?: boolean;
}

const StatusBadge: React.FC<{ status: Status }> = ({ status }) => {
  const styles = {
    pending: 'bg-yellow-500/20 text-yellow-500',
    accepted: 'bg-green-500/20 text-green-500',
    rejected: 'bg-red-500/20 text-red-500'
  };

  const text = {
    pending: 'En attente',
    accepted: 'Acceptée',
    rejected: 'Refusée'
  };

  return (
    <span className={`inline-block px-4 py-1.5 rounded-lg font-medium text-sm ${styles[status]}`}>
      {text[status]}
    </span>
  );
};

const InfoField: React.FC<{ label: string; value: string; className?: string }> = ({ 
  label, 
  value,
  className = "" 
}) => (
  <div className={`flex flex-col ${className}`}>
    <span className="text-xs text-gray-400 mb-1">{label}</span>
    <span className="text-sm text-white font-medium leading-tight">{value}</span>
  </div>
);

const DateTimeField: React.FC<{ date: string; time: string; className?: string }> = ({
  date,
  time,
  className = ""
}) => (
  <div className={`flex flex-col ${className}`}>
    <span className="text-xs text-gray-400 mb-1">Date et Heure</span>
    <div className="flex flex-col space-y-1">
      <span className="text-sm text-white font-medium leading-tight">{date}</span>
      <span className="text-sm text-white font-medium leading-tight">{time}</span>
    </div>
  </div>
);

const MessageContent: React.FC<MessageProps> = ({ userName, from, to, date, time, status }) => (
  <div className="bg-[#1A2D3E] rounded-lg p-4 w-full max-w-xl hover:bg-[#243447] transition-colors duration-200">
    <div className="flex flex-col space-y-4">
      {/* En-tête */}
      <div className="flex flex-col items-center space-y-2">
        <span className="text-base text-white font-medium">{userName}</span>
        {status && <StatusBadge status={status} />}
      </div>

      {/* Ligne de séparation */}
      <div className="border-t border-gray-700 my-2"></div>

      {/* Trajet et Date/Heure */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <InfoField 
            label="Départ" 
            value={from} 
            className="bg-[#0A1D2E] rounded-lg p-3"
          />
          <InfoField 
            label="Arrivée" 
            value={to}
            className="bg-[#0A1D2E] rounded-lg p-3" 
          />
        </div>
        <DateTimeField 
          date={date}
          time={time}
          className="bg-[#0A1D2E] rounded-lg p-3"
        />
      </div>
    </div>
  </div>
);

const Message: React.FC<MessageProps> = (props) => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const handleAccept = () => {
    props.onAccept?.();
    setIsPopUpOpen(false);
  };

  const handleRefuse = () => {
    props.onReject?.();
    setIsPopUpOpen(false);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsPopUpOpen(false);
    }
  };

  return (
    <>
      <div onClick={() => setIsPopUpOpen(true)} className="cursor-pointer">
        <Division variant="default" className="p-2">
          <MessageContent {...props} />
        </Division>
      </div>

      {isPopUpOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleOverlayClick}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <PopUpMessage
              {...props}
              onAccept={props.showActions ? handleAccept : undefined}
              onRefuse={props.showActions ? handleRefuse : undefined}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Message; 