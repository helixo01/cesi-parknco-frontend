import React from 'react';
import { colors } from '@/styles/colors';

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
            style={{ 
              borderColor: colors.state.error, 
              color: colors.text.white,
              backgroundColor: `${colors.state.error}99`
            }}
            className="flex-1 border-2 rounded-lg px-6 py-3 hover:bg-opacity-100 transition-colors"
          >
            Annuler
          </button>

          {/* Bouton Accepter */}
          <button
            onClick={onAccept}
            style={{ 
              borderColor: colors.state.success, 
              color: colors.text.white,
              backgroundColor: `${colors.state.success}99`
            }}
            className="flex-1 border-2 rounded-lg px-6 py-3 hover:bg-opacity-100 transition-colors"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpConfirmation; 