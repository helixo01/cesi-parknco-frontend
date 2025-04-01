/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10B981',
          light: '#D1FAE5',
          dark: '#059669',
        },
        background: {
          DEFAULT: '#F9FAFB',
          card: '#FFFFFF',
          dark: '#1F2937',
        },
        text: {
          DEFAULT: '#1F2937',
          secondary: '#6B7280',
          dark: '#F9FAFB',
          'secondary-dark': '#D1D5DB',
        },
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
      },
      borderRadius: {
        'sm': '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
      },
    },
  },
  plugins: [],
};