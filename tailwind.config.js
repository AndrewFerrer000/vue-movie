/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  safelist: [
    {
      pattern: /(bg|text|border)-(gray|blue|green|red|yellow)-(100|700)/,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
