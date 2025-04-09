import React from 'react';
import { colors } from '@/styles/colors';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  maxWidth = 'max-w-2xl'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay sombre */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Contenu du modal */}
      <div 
        className={`relative ${maxWidth} w-full transform rounded-lg transition-all`}
        style={{ backgroundColor: colors.background.default }}
      >
        {/* Bouton de fermeture */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-white hover:text-gray-300 transition-colors"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Contenu */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}; 