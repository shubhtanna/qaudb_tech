/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      rotate: {
        '150': '-30deg',
        '15' : '-15deg'
      },
      skew: {
        '30': '30deg',
        '6' :'6deg'
      },
      keyframes: {
        scrollleft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        scrollright:{
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        }
      },
      animation: {
        scrollleft: 'scrollleft 5s linear infinite',
        scrollright: 'scrollright 3s linear infinite'
      },
    },
  },
  plugins: [],
}

