/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#a855f7',
          light: '#c084fc',
          dark: '#7e22ce',
        },
      },
      boxShadow: {
        brand: '0 4px 14px rgba(168, 85, 247, 0.35)',
        'brand-lg': '0 6px 20px rgba(168, 85, 247, 0.5)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(50%)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.6s ease-in-out',
        shimmer: 'shimmer 3s infinite linear',
      },
    },
  },
  plugins: [],
};
