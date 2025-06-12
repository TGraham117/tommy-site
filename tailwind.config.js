/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lexia Mono', 'monospace'], // this is now the default
        frittomisto: ['frequencies-frittomisto', 'sans-serif'],
      },
      colors: {
        'static-grey': '#B2B2B2',
        'apple-grey': '#F5F5F7',
        'TH-red': '#A40B1E',
        'TH-blue': '#0E80B8',
        'TH-black': '#191B22',
        'popping-red': '#CB0909',
      },
      screens: {
        sm: "40rem",
        md: "53.25rem",
        lg: "64rem",
        xl: "83rem",
        "2xl": "96rem",
      },
      animation: {
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        }
      }                
    },
  },
  plugins: [],
};