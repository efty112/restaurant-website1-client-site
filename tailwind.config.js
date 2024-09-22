/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'logIn-pattern': "url('./src/assets/reservation/wood-grain-pattern-gray1x.png')",
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

