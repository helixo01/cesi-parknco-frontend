import React from 'react';

interface PopUpConfirmationProps {
  message: string;
  onCancel: () => void;
  onAccept: () => void;
  isOpen: boolean;
}

export const PopUpConfirmation: React.FC<PopUpConfirmationProps> = ({
  message,
  onCancel,
  onAccept,
  isOpen
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#0A1D2E] text-white rounded-xl p-6 shadow-lg max-w-md w-full mx-4">
        {/* Message */}
        <div className="text-center mb-8">
          <p className="text-lg">{message}</p>
        </div>

        {/* Boutons */}
        <div className="flex justify-center gap-4">
          {/* Bouton Annuler */}
          <button
            onClick={onCancel}
            className="flex-1 border-2 border-gray-400 text-gray-400 rounded-lg px-6 py-3 hover:bg-gray-700 hover:border-gray-700 transition-colors"
          >
            Annuler
          </button>

          {/* Bouton Accepter */}
          <button
            onClick={onAccept}
            className="flex-1 border-2 border-green-500 text-green-500 rounded-lg px-6 py-3 hover:bg-green-700 hover:border-green-700 hover:text-white transition-colors"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpConfirmation; 