/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  safelist: [
    "bg-gray-100",
    "bg-blue-100",
    "bg-green-100",
    "bg-red-100",
    "bg-yellow-100",
    "border-gray-700",
    "border-blue-700",
    "border-green-700",
    "border-red-700",
    "border-yellow-700",
    "text-gray-700",
    "text-blue-700",
    "text-green-700",
    "text-red-700",
    "text-yellow-700",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
