/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0077b6",
        secondary: "#004d99",
        red: {
          600: "#e63946",
          700: "#d62839",
        },
        gray: {
          800: "#333333",
          900: "#1f1f1f",
        },
      },
      spacing: {
        128: "32rem",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        zoomIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in-out",
        zoomIn: "zoomIn 1s ease-in-out",
      },
    },
  },
  plugins: [],
};
