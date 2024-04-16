/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: '#EF4444',
        borderColor: '#CBD5E0',
        iconColor: '#4B5563',
      }
    },
  },
  plugins: [],
};
