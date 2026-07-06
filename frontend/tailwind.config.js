/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        fifa: {
          green: {
            50: '#f0fdf4',
            100: '#dcfce7',
            200: '#bbf7d0',
            300: '#86efac',
            400: '#4ade80',
            500: '#22c55e',
            600: '#16a34a',
            700: '#15803d',
            800: '#166534',
            900: '#14532d',
            950: '#052e16',
          },
          gold: {
            50: '#fdfbeb',
            100: '#fcf6c7',
            200: '#f9ea8d',
            300: '#f6d54d',
            400: '#f2bd1b',
            500: '#d9a00d',
            600: '#b87c07',
            700: '#935807',
            800: '#77450c',
            900: '#64380f',
            950: '#3b1c04',
          },
          dark: {
            bg: '#090d16',
            card: '#121826',
            border: '#1f293d',
            accent: '#ffd700',
          }
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-green': '0 0 15px rgba(34, 197, 94, 0.2)',
        'glow-gold': '0 0 15px rgba(217, 160, 13, 0.2)',
      }
    },
  },
  plugins: [],
}


