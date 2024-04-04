/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        main: '#668C3F',
        secondary: '#728C58',
        tertiary: '#93A680',
        lightGreen: '#B4BFA3',
        background: '#F2EAE4',
      },
    },
  },
  plugins: [],
}
