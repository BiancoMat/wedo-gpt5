/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { 500: "#2F66F6", 600: "#1E4ED8" }
      }
    },
  },
  plugins: [],
}
