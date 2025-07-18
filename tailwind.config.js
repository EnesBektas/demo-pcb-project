/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': {
          DEFAULT: '#2A3F8C',
          light: '#e8f0fe',
          dark: '#1e2d6a'
        }
      },
    },
  },
  plugins: [],
}