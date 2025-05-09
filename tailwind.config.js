/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Harbor Soccer custom colors
        primary: {
          DEFAULT: "#FF6B00", // Orange
          light: "#FF8A3D",
          dark: "#E05A00",
        },
        secondary: {
          DEFAULT: "#000000", // Black
          light: "#333333",
        },
        accent: {
          DEFAULT: "#FFFFFF", // White
          off: "#F5F5F5",
        },
        // Keep existing Tailwind blues for secondary accents
        blue: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Arial", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      backgroundImage: {
        'soccer-pattern': "url('/images/soccer-pattern.png')",
        'field-texture': "url('/images/field-texture.jpg')",
        'hero-image': "url('/images/soccer-hero.jpg')",
      },
    },
  },
  plugins: [],
};