import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'error' | 'warning' | 'info';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge = ({
  children,
  variant = 'info',
  icon,
  className = '',
}: BadgeProps) => {
  const variantStyles = {
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-800',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1 px-2.5 py-0.5 
        rounded-full text-sm font-medium
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {icon}
      {children}
    </span>
  );
};
