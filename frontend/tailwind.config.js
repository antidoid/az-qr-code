/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-doodle": "url(/src/assets/hero-bg.jpg)",
      },
      colors: {
        red: "rgb(226, 29, 29)",
        green: "rgb(34, 165, 63)",
        blue: "rgb(10, 2, 99)",
        yellow: "rgb(255, 157, 11)",
      },
    },
  },
  plugins: [],
};
