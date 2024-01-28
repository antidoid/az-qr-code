/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-doodle": "url(/src/assets/hero-bg.jpg)",
      },
    },
  },
  plugins: [],
};
