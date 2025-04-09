import React from 'react';
import Link from 'next/link';
import { IoArrowBack } from 'react-icons/io5';

interface BackButtonProps {
  href?: string;
  onClick?: () => void;
  className?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ href, onClick, className }) => {
  const buttonContent = (
    <div className="flex items-center text-white hover:text-gray-300 transition-colors">
      <IoArrowBack size={24} className="mr-2" />
      <span>Retour</span>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className={`inline-block ${className || ''}`}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`inline-block ${className || ''}`}>
      {buttonContent}
    </button>
  );
}; 