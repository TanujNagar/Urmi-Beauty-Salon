/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      ivory: '#FDF8F3',
      espresso: '#1A1210',
      gold: '#B8935F',
      blush: '#D9A6A0',
      ink: '#2B211D',
      cream: '#F5EDE6',
    },
    fontFamily: {
      serif: ['"Playfair Display"', 'serif'],
      sans: ['Inter', 'sans-serif'],
    },
  },
},