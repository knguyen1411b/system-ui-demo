/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'mb-purple': { 400: '#a78bfa', 500: '#8b5cf6', 600: '#7c3aed' },
        'mb-dark': '#0f172a',
      },
    },
  },
  plugins: [],
};
