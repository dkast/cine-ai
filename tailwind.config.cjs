const colors = require("tailwindcss/colors")

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: colors.zinc
      },
      fontFamily: {
        sans: ["var(--font-inter)"]
      }
    }
  },
  // @ts-ignore
  plugins: [require("tailwindcss-animate")]
}

module.exports = config
