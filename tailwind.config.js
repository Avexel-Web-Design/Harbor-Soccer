/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'harbor-orange': {
          DEFAULT: '#ff8c00',
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#ff8c00',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        'harbor-blue': {
          DEFAULT: '#2c5aa0',
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2c5aa0',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      fontFamily: {
        'junicode': ['Junicode', 'Georgia', 'Times New Roman', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': 'radial-gradient(circle at 1px 1px, rgba(255, 140, 0, 0.05) 1px, transparent 0)',
        'dither': 'linear-gradient(135deg, rgba(44, 90, 160, 0.1), rgba(255, 140, 0, 0.1))',
      },
      backgroundSize: {
        'dots': '20px 20px',
      },
      animation: {
        'hero-float': 'heroFloat 6s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease forwards',
        'modal-slide-in': 'modalSlideIn 0.3s ease-out',
        'slide-in-left': 'slideInLeft 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'ripple': 'ripple 0.6s ease-out',
      },
      keyframes: {
        heroFloat: {
          '0%, 100%': {
            transform: 'translateY(0px) scale(1)',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
          },
          '50%': {
            transform: 'translateY(-10px) scale(1.02)',
            textShadow: '4px 4px 8px rgba(0, 0, 0, 0.4)',
          },
        },
        fadeInUp: {
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        modalSlideIn: {
          from: {
            opacity: '0',
            transform: 'translateY(-50px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideInLeft: {
          from: {
            opacity: '0',
            transform: 'translateX(30px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        ripple: {
          to: {
            width: '300px',
            height: '300px',
          },
        },
      },
      minHeight: {
        'screen-safe': '100vh',
        'screen-safe-dynamic': '100dvh',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}