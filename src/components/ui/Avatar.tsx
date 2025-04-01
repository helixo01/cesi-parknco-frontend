import React from 'react';
import Image from 'next/image';

interface AvatarProps {
  src?: string | null;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar = ({
  src,
  alt,
  size = 'md',
  className = '',
}: AvatarProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const bgColors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-red-500',
    'bg-purple-500',
  ];

  // Use a consistent color based on the name
  const colorIndex = alt.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % bgColors.length;
  const bgColor = bgColors[colorIndex];

  if (!src) {
    return (
      <div 
        className={`relative rounded-full flex items-center justify-center text-white font-medium ${sizeClasses[size]} ${bgColor} ${className}`}
        style={{ fontSize: size === 'sm' ? '0.75rem' : '1rem' }}
      >
        {getInitials(alt)}
      </div>
    );
  }

  return (
    <div className={`relative rounded-full overflow-hidden ${sizeClasses[size]} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        onError={(e) => {
          // En cas d'erreur de chargement, on remplace par les initiales
          e.currentTarget.style.display = 'none';
          e.currentTarget.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center text-white font-medium ${bgColor}">${getInitials(alt)}</div>`;
        }}
      />
    </div>
  );
};
