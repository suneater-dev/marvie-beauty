/**
 * Tailwind CSS Configuration for Marvie Beauty
 *
 * This config extends Tailwind with custom color tokens matching the brand palette.
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#475161',    // Dark blue/gray
        accent: '#D9C7B0',     // Soft beige/gold
        'accent-dark': '#B8A890', // Darker gold for hover
        bg: '#FAF9F7',         // Off-white background
        'bg-dark': '#2A2F3A',  // Dark background for sections
        text: '#333333',       // Main text color
        muted: '#858D93',      // Muted text color
      },
      fontFamily: {
        sans: ['Jost', 'sans-serif'],
      },
      letterSpacing: {
        'widest': '.2em',
      },
      spacing: {
        '18': '4.5rem',   // 72px
        '22': '5.5rem',   // 88px
        '26': '6.5rem',   // 104px
      },
      boxShadow: {
        'card': '0 4px 16px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.12)',
      },
      borderRadius: {
        'card': '12px',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
    },
  },
  plugins: [],
}
