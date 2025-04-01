import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  darkMode?: boolean;
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  onClick,
  type = 'button',
  className = '',
  darkMode = false,
}: ButtonProps) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  const baseStyles = `
    inline-flex items-center justify-center
    font-medium rounded-lg
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-60 disabled:cursor-not-allowed
    ${sizeClasses[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  const variantStyles = {
    primary: `
      bg-gradient-to-r from-primary to-primary-dark
      text-white
      hover:opacity-90
      focus:ring-primary/50
    `,
    secondary: `
      bg-gray-100
      text-gray-800
      hover:bg-gray-200
      focus:ring-gray-400/50
      ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : ''}
    `,
    outline: `
      border-2 border-primary
      text-primary
      hover:bg-primary/10
      focus:ring-primary/50
      ${darkMode ? 'border-white text-white hover:bg-white/10' : ''}
    `,
    ghost: `
      text-gray-600
      hover:bg-gray-100
      focus:ring-gray-400/50
      ${darkMode ? 'text-gray-300 hover:bg-gray-700' : ''}
    `,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variantStyles[variant]}`}
    >
      {loading ? (
        <svg
          className="animate-spin h-5 w-5 mr-2"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : icon && iconPosition === 'left' ? (
        <span className="mr-2">{icon}</span>
      ) : null}
      {children}
      {icon && iconPosition === 'right' && !loading && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
};
