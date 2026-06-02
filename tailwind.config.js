/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        rosa: {
          50: "#FBEAF0",
          100: "#F4C0D1",
          200: "#ED93B1",
          300: "#E06C97",
          400: "#D4537E",
          500: "#B84368",
          600: "#993556",
          700: "#852C49",
          800: "#72243E",
          900: "#4B1528",
          950: "#2E0C18",
        },
      },
    },
  },
  plugins: [],
};
