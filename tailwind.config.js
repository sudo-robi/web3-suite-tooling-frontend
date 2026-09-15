/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stellar: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#6B3FA0',
          600: '#5b21b6',
          700: '#4c1d95',
          800: '#3b0764',
          900: '#2e1065',
        },
      },
    },
  },
  plugins: [],
}
