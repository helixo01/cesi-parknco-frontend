import React, { useState } from 'react';
import { Avatar } from '../ui/Avatar';
import { FiArrowLeft, FiX, FiCheck } from 'react-icons/fi';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export interface Message {
  id: string;
  sender: 'user' | 'other' | 'system';
  content: string;
  timestamp: Date;
  type?: 'request' | 'response' | 'normal' | 'status';
  status?: 'pending' | 'accepted' | 'rejected';
  comment?: string;
}

interface ConversationDetailProps {
  userName: string;
  messages: Message[];
  onBack: () => void;
  onAccept?: (messageId: string, comment: string) => void;
  onReject?: (messageId: string, comment: string) => void;
  className?: string;
}

export const ConversationDetail: React.FC<ConversationDetailProps> = ({
  userName,
  messages,
  onBack,
  onAccept,
  onReject,
  className = '',
}) => {
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [comment, setComment] = useState('');
  const [pendingAction, setPendingAction] = useState<{
    type: 'accept' | 'reject';
    messageId: string;
  } | null>(null);

  const handleAction = (type: 'accept' | 'reject', messageId: string) => {
    setPendingAction({ type, messageId });
    setShowCommentModal(true);
  };

  const handleSubmitComment = () => {
    if (!pendingAction) return;

    if (pendingAction.type === 'accept' && onAccept) {
      onAccept(pendingAction.messageId, comment);
    } else if (pendingAction.type === 'reject' && onReject) {
      onReject(pendingAction.messageId, comment);
    }

    setShowCommentModal(false);
    setComment('');
    setPendingAction(null);
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Header */}
      <div className="flex items-center p-4 border-b border-[#2B4D63]/30 bg-[#2B4D63]/30">
        <button
          onClick={onBack}
          className="p-2 hover:bg-[#2B4D63]/20 rounded-full mr-2 lg:hidden transition-colors"
        >
          <FiArrowLeft className="w-5 h-5 text-gray-300" />
        </button>
        <div className="flex items-center space-x-3">
          <Avatar src={null} alt={userName} size="sm" />
          <span className="font-medium text-gray-200">{userName}</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.type === 'status' ? (
              <div className="max-w-[85%] bg-[#2B4D63]/10 text-gray-400 rounded-lg px-4 py-2 text-sm text-center mx-auto">
                {message.content}
              </div>
            ) : message.sender === 'system' ? (
              <div className="max-w-[85%] bg-[#2B4D63]/20 text-gray-400 rounded-lg p-3 text-sm">
                {message.content}
              </div>
            ) : (
              <div className={`max-w-[85%] space-y-1`}>
                <div className={`flex items-end space-x-2 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  {message.sender === 'other' && (
                    <Avatar src={null} alt={userName} size="sm" className="w-6 h-6" />
                  )}
                  <div
                    className={`rounded-lg p-3 text-sm ${
                      message.sender === 'user'
                        ? 'bg-[#2B4D63] text-white'
                        : 'bg-[#2B4D63]/20 text-gray-200'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
                <div
                  className={`text-xs text-gray-500 ${
                    message.sender === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  {format(message.timestamp, 'HH:mm', { locale: fr })}
                </div>

                {/* Actions pour les demandes de réservation */}
                {message.type === 'request' && message.status === 'pending' && onAccept && onReject && (
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => handleAction('accept', message.id)}
                      className="flex items-center space-x-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm transition-colors"
                    >
                      <FiCheck className="w-4 h-4" />
                      <span>Accepter</span>
                    </button>
                    <button
                      onClick={() => handleAction('reject', message.id)}
                      className="flex items-center space-x-1 px-3 py-1.5 bg-red-600/80 hover:bg-red-600 text-white rounded-lg text-sm transition-colors"
                    >
                      <FiX className="w-4 h-4" />
                      <span>Refuser</span>
                    </button>
                  </div>
                )}

                {/* Affichage du commentaire s'il y en a un */}
                {message.comment && (
                  <div className="text-sm mt-2 text-gray-400 italic">
                    "{message.comment}"
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input - désactivé pour l'instant */}
      <div className="p-4 border-t border-[#2B4D63]/30 bg-[#2B4D63]/30">
        <div className="bg-[#0B1622] text-gray-400 rounded-lg p-3 text-sm text-center">
          Les messages sont désactivés. Utilisez les boutons d'action pour répondre aux demandes.
        </div>
      </div>

      {/* Modal de commentaire */}
      {showCommentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#0B1622] rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-200 mb-4">
              {pendingAction?.type === 'accept' ? 'Accepter' : 'Refuser'} la demande
            </h3>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Ajoutez un commentaire (optionnel)..."
              className="w-full h-32 px-3 py-2 text-sm bg-[#2B4D63]/20 border border-[#2B4D63]/30 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#2B4D63] resize-none"
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => {
                  setShowCommentModal(false);
                  setComment('');
                  setPendingAction(null);
                }}
                className="px-4 py-2 text-sm text-gray-400 hover:text-gray-300 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleSubmitComment}
                className="px-4 py-2 text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
