/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          100: "#FFE4E6",
          200: "#FFCCD2",
          300: "#FFA3AC",
          400: "#FF7A85",
          500: "#FF527D", // Основной цвет
          600: "#FF2A55",
          700: "#D91E4A",
          800: "#B3113F",
          900: "#8C0734",
        },
      },
      fontFamily: {
        serif: ["Merriweather", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      spacing: {
        28: "7rem",
        72: "18rem",
        96: "24rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
  mode: "jit", // Включение режима Just-In-Time для динамических классов
};
