import React from 'react';
import { Avatar } from '../ui/Avatar';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export interface Conversation {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  lastMessage: string;
  date: Date;
  status: 'upcoming' | 'current' | 'completed';
  tripPeriod: string;
  unread?: boolean;
}

interface ConversationListProps {
  conversations: Conversation[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  selectedId,
  onSelect,
}) => {
  const getStatusText = (status: Conversation['status']) => {
    switch (status) {
      case 'upcoming':
        return 'Réservation à venir';
      case 'current':
        return 'Trajet en cours';
      case 'completed':
        return 'Trajet terminé';
    }
  };

  const getStatusColor = (status: Conversation['status']) => {
    switch (status) {
      case 'upcoming':
        return 'text-green-500';
      case 'current':
        return 'text-blue-500';
      case 'completed':
        return 'text-gray-400';
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      {conversations.map((conversation) => (
        <button
          key={conversation.id}
          onClick={() => onSelect(conversation.id)}
          className={`w-full text-left p-4 hover:bg-[#2B4D63]/20 transition-colors ${
            selectedId === conversation.id ? 'bg-[#2B4D63]/30 border-l-4 border-[#2B4D63]' : 'border-l-4 border-transparent'
          }`}
        >
          <div className="flex items-center space-x-3">
            <Avatar
              src={null}
              alt={conversation.user.name}
              size="md"
            />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <p className="font-medium truncate text-gray-200">{conversation.user.name}</p>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                  {format(conversation.date, 'd MMM', { locale: fr })}
                </span>
              </div>
              <p className="text-sm text-gray-400 truncate">{conversation.lastMessage}</p>
              <p className={`text-xs mt-1 ${getStatusColor(conversation.status)}`}>
                {getStatusText(conversation.status)} · {conversation.tripPeriod}
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};
