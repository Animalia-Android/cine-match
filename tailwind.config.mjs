/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      container: {
        center: true, // Centers all containers automatically
        padding: '1rem', // Adds padding to prevent edge clipping
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Custom font
      },
      spacing: {
        72: '18rem', // Custom spacing
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        brand: {
          primary: '#FACC15', // CineMatch Yellow
          accent: '#FFD700', // Gold
          dark: '#111827', // Deep Background Gray
          highlight: '#00E6E6', // Neon Cyan Accent
        },
      },
      screens: {
        xs: '480px', // Extra small screens (custom)
        '3xl': '1600px', // For ultra-wide screens
      },
    },
  },
  plugins: [],
};
