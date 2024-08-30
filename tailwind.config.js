/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Adjust according to your folder structure
    "./pages/**/*.{js,ts,jsx,tsx}", // If using Next.js, include this for pages
    "./components/**/*.{js,ts,jsx,tsx}", // Include your components folder if you have one
  ],
  theme: {
    extend: {
      // Custom colors or spacing can be added here
      colors: {
        'primary': '#0077b6', // Example primary color
        'secondary': '#004d99', // Example secondary color
        'red': {
          600: '#e63946',
          700: '#d62839',
        },
        'gray': {
          800: '#333333',
          900: '#1f1f1f',
        },
      },
      spacing: {
        '128': '32rem', // Example custom spacing
      },
    },
  },
  plugins: [],
}
