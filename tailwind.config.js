/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    {
      pattern: /(from|to|border|text|bg)-(blue|purple|green|orange)-(50|100|200|500|600|900)/,
    },
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