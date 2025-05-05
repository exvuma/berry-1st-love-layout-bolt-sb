/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        berry: {
          red: '#FF4D6D',
          green: '#7EA16B',
          pink: '#FFB7C3',
          light: '#FFECEF',
          dark: '#D83F5D',
        },
        safari: {
          green: '#A5CC8E',
          yellow: '#F4E189',
          tan: '#B9967A',
          cream: '#F9F7F1',
        },
        neutral: {
          50: '#F9F9F9',
          100: '#F1F1F1',
          200: '#E1E1E1',
          300: '#D1D1D1',
          400: '#A1A1A1',
          500: '#717171',
          600: '#515151',
          700: '#414141',
          800: '#313131',
          900: '#212121',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 3s ease-in-out infinite',
      },
      backgroundImage: {
        'checkered-light': 'repeating-linear-gradient(45deg, #FFB7C330 0, #FFB7C330 4px, transparent 0, transparent 8px)',
        'dots-pattern': 'radial-gradient(#FF4D6D20 2px, transparent 2px)',
        'safari-pattern': 'repeating-linear-gradient(45deg, #A5CC8E30 0, #A5CC8E30 4px, transparent 0, transparent 8px)',
      },
    },
  },
  plugins: [],
};