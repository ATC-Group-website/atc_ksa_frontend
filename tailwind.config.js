/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#EB1F2F",
        grayBg: "#f6f6f6",
        grayTitle: "#848484",
        grayPar: "#888888",
      },
      backgroundImage: {
        "white-gray-gradient":
          "linear-gradient(to bottom, white 20%, #f6f6f6 20% 100%)",
      },
      keyframes: {
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-100px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeInDown: 'fadeInDown 1s ease-out',
      },
    },
  },
  plugins: [require("flowbite/plugin"), require("tailwindcss-rtl")],
};
