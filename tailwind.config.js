/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      fontFamily: {
        'junicode': ['Junicode', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'harbor-blue': '#2c5aa0',
        'harbor-orange': '#ff8c00',
      },
      animation: {
        'hero-float': 'heroFloat 6s ease-in-out infinite',
      },
      keyframes: {
        heroFloat: {
          '0%, 100%': { transform: 'translateY(0px) scale(1)', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' },
          '50%': { transform: 'translateY(-10px) scale(1.02)', textShadow: '4px 4px 8px rgba(0, 0, 0, 0.4)' },
        },
      },
    },
  },
  plugins: [],
}
