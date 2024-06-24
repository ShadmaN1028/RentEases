/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        background: "#d2d2d2",
        button: "#49c41e",
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
