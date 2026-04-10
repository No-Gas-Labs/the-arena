/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00d9ff',
        secondary: '#ff006e',
        dark: '#0a0e27',
        darker: '#050812',
        surface: '#1a1f3a',
      },
    },
  },
  plugins: [],
}
