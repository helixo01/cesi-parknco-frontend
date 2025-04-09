import React from 'react';
import { colors } from '@/styles/colors';

interface TagProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export const Tag: React.FC<TagProps> = ({ label, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: isSelected ? colors.components.titre.text.highlight : 'transparent',
        borderColor: colors.components.titre.text.highlight,
        color: isSelected ? colors.background.page : colors.components.titre.text.highlight
      }}
      className={`
        px-4 
        py-2 
        rounded-full 
        border-2 
        text-sm 
        font-medium 
        transition-all 
        duration-200 
        hover:bg-opacity-80
      `}
    >
      {label}
    </button>
  );
};

export default Tag; 