/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("nativewind/preset")],
  content: [
    './index.{js,ts,tsx}',
    './app/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#f3d1d1', // Replaced turquoise with maroon
          200: '#e6a4a4', // Replaced turquoise with maroon
          300: '#d97676', // Replaced turquoise with maroon
          400: '#cc4949', // Replaced turquoise with maroon
          500: '#bf1b1b', // Replaced turquoise with maroon
          600: '#9c1616', // Replaced turquoise with maroon
          700: '#791010', // Replaced turquoise with maroon
          800: '#560b0b', // Replaced turquoise with maroon
          900: '#330505', // Replaced turquoise with maroon
        }
      },
    },
  },
  plugins: [],
};
