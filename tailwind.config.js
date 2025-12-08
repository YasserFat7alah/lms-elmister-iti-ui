/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mainPink: "#FF0055",
        mainBlue: "#392b80",
      },
    },
  },
  plugins: [],
}