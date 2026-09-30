/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        blueprint: {
          950: '#2B2C2E',
          900: '#2B2C2E',
          800: '#A6C9E2',
          700: '#A6C9E2',
          line: '#A6C9E2',
        },
        site: {
          amber: '#80AFD2',
          amberDark: '#2B2C2E',
          logoBlue: '#A6C9E2',
          paper: '#FFFFFF',
          concrete: '#A6C9E2',
          concreteDark: '#2B2C2E',
        },
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'sans-serif'],
        body: ['"Work Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
