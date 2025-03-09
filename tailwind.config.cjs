module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: ["bg-red-500", "text-xl"], // Helps confirm Tailwind is working
};
