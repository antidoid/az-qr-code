/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-doodle": "url(/src/assets/hero-bg.jpg)",
      },
      colors: {
        lolared: "#E21D1D",
      },
      // backgroundImage: {
      //   green: "rgba(34, 165, 63, 1)",
      //   blue: "rgba(10, 2, 99, 1)",
      //   yellow: "rgba(255, 157, 11, 1)",
      // },
    },
  },
  plugins: [],
};
