/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f4',
          100: '#dcf2e7',
          200: '#bbe5d1',
          300: '#8ad1b3',
          400: '#4a7c59',
          500: '#4a7c59',
          600: '#3d6548',
          700: '#32503a',
          800: '#2a4130',
          900: '#243628',
        },
        secondary: {
          50: '#fdf8f3',
          100: '#f8efe1',
          200: '#f0dcc2',
          300: '#e4c299',
          400: '#d4a373',
          500: '#d4a373',
          600: '#b8845c',
          700: '#98674a',
          800: '#7a533f',
          900: '#634436',
        },
        accent: {
          50: '#faf9f8',
          100: '#f2f0ee',
          200: '#e8e3de',
          300: '#d8d0c8',
          400: '#c9ada7',
          500: '#c9ada7',
          600: '#b1928a',
          700: '#967970',
          800: '#7a635c',
          900: '#63514d',
        },
        light: '#f8f9fa',
        dark: '#344e41',
        cream: '#f4f1e9',
      },
      fontFamily: {
        'heading': ['Montserrat', 'sans-serif'],
        'body': ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

