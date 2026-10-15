/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#081321',
        charcoal: '#111820',
        builderOrange: '#FF7628',
        warmWhite: '#F7F7F4',
        steelGrey: '#A7B0BA',
        goldAccent: '#D5AA66',
      },
      fontFamily: {
        sans: ['Manrope', 'Inter', 'Noto Sans Devanagari', 'sans-serif'],
        hindi: ['Noto Sans Devanagari', 'sans-serif'],
      },
      boxShadow: {
        'orange-glow': '0 0 30px -5px rgba(255, 118, 40, 0.35)',
        'orange-sm': '0 0 15px -3px rgba(255, 118, 40, 0.4)',
        'navy-deep': '0 25px 50px -12px rgba(8, 19, 33, 0.8)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }
    },
  },
  plugins: [],
}
