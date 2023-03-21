/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"]
      }
    }
  },
  // @ts-ignore
  plugins: [require("tailwindcss-animate")]
}

module.exports = config
