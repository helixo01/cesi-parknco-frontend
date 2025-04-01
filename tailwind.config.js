/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-montserrat)"],
      },
      colors: {
        primary: {
          main: "var(--color-primary-main)",
          light: "var(--color-primary-light)",
          dark: "var(--color-primary-dark)",
        },
        error: {
          DEFAULT: "var(--color-error)",
          light: "#FEE2E2",
          main: "#A72525",
          dark: "#7F1D1D",
        },
      },
    },
  },
  plugins: [],
}; 