/** @type {import('tailwindcss').Config} */

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: require('tailwindcss/colors'),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
