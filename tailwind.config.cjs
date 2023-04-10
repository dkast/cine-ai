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
      },
      animation: {
        "spin-slow": "spin 5s ease-out infinite"
      }
    }
  },
  // @ts-ignore
  plugins: [require("tailwindcss-animate")]
}

module.exports = config
