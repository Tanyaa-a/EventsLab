/** @type {import('tailwindcss').Config} */
module.exports ={
  content: [
    './index.html', 
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#262626',
        pureWhite: '#FFFFFF',
        white: '#F5FFFF',
      },
      fontFamily: {
        spartan: ['League Spartan', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [], 
}

