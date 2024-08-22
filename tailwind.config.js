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
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
      },
      backgroundImage: {
        "white-gray-gradient":
          "linear-gradient(to bottom, white 20%, #f6f6f6 20% 100%)",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
