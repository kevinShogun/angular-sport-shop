/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        barlow: ["Barlow", "Roboto"],
        pompiere: ["Pompiere"],
        kiteOne: ["Kite One"]
      },
    },
  },
  plugins: [],
};
