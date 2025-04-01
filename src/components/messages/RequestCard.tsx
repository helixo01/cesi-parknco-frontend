import React from 'react';
import { Avatar } from '../ui/Avatar';
import { Card } from '../ui/Card';
import { FiClock, FiMapPin, FiCheck, FiX, FiMessageSquare } from 'react-icons/fi';
import { colors } from '@/styles/colors';

export interface TripRequest {
  id: string;
  type: 'sent' | 'received';
  status: 'pending' | 'accepted' | 'rejected';
  trip: {
    date: string;
    departure: string;
    arrival: string;
    time: string;
  };
  user: {
    name: string;
    message?: string;
  };
  comment?: string;
}

interface RequestCardProps {
  request: TripRequest;
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  onComment?: (id: string, comment: string) => void;
}

export const RequestCard: React.FC<RequestCardProps> = ({
  request,
  onAccept,
  onReject,
  onComment,
}) => {
  const [isCommenting, setIsCommenting] = React.useState(false);
  const [comment, setComment] = React.useState(request.comment || '');

  const getStatusColor = () => {
    switch (request.status) {
      case 'accepted':
        return 'text-green-500';
      case 'rejected':
        return 'text-red-500';
      default:
        return 'text-yellow-500';
    }
  };

  const getStatusText = () => {
    switch (request.status) {
      case 'accepted':
        return 'Accepté';
      case 'rejected':
        return 'Refusé';
      default:
        return 'En attente';
    }
  };

  const handleCommentSubmit = () => {
    if (comment.trim() && onComment) {
      onComment(request.id, comment);
      setIsCommenting(false);
    }
  };

  return (
    <Card className="bg-blue-900 text-white p-4">
      <div className="space-y-4">
        {/* En-tête avec statut */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Avatar
              src={null}
              alt={request.user.name}
              size="sm"
            />
            <div>
              <div className="text-sm font-medium">{request.user.name}</div>
              <div className={`text-xs ${getStatusColor()}`}>{getStatusText()}</div>
            </div>
          </div>
          <div className="text-sm text-gray-400">{request.trip.date}</div>
        </div>

        {/* Détails du trajet */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <FiClock className="text-gray-400" />
            <span>{request.trip.time}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FiMapPin className="text-gray-400" />
            <div className="flex-1">
              <div>{request.trip.departure}</div>
              <div className="text-gray-400">→</div>
              <div>{request.trip.arrival}</div>
            </div>
          </div>
        </div>

        {/* Message de l'utilisateur si présent */}
        {request.user.message && (
          <div className="text-sm bg-gray-800 p-3 rounded-lg">
            {request.user.message}
          </div>
        )}

        {/* Actions ou commentaire */}
        {request.type === 'received' && request.status === 'pending' && (
          <div className="flex space-x-2">
            <button
              onClick={() => onAccept?.(request.id)}
              className="flex-1 flex items-center justify-center space-x-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              <FiCheck />
              <span>Accepter</span>
            </button>
            <button
              onClick={() => onReject?.(request.id)}
              className="flex-1 flex items-center justify-center space-x-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              <FiX />
              <span>Refuser</span>
            </button>
          </div>
        )}

        {/* Zone de commentaire */}
        <div>
          {!isCommenting && (
            <button
              onClick={() => setIsCommenting(true)}
              className="flex items-center space-x-1 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <FiMessageSquare />
              <span>{request.comment ? 'Modifier le commentaire' : 'Ajouter un commentaire'}</span>
            </button>
          )}
          
          {isCommenting && (
            <div className="space-y-2">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full bg-gray-800 text-white rounded-lg p-2 text-sm"
                placeholder="Écrivez votre commentaire..."
                rows={3}
              />
              <div className="flex space-x-2">
                <button
                  onClick={handleCommentSubmit}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded text-sm transition-colors"
                >
                  Envoyer
                </button>
                <button
                  onClick={() => setIsCommenting(false)}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Annuler
                </button>
              </div>
            </div>
          )}

          {request.comment && !isCommenting && (
            <div className="mt-2 text-sm bg-gray-800 p-3 rounded-lg">
              {request.comment}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
