/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{tsx,ts}", "./components/**/*.{tsx,ts}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        "brand-volt": "#CCFF00",
        "brand-volt-dim": "#abd600",
        "brand-red": "#fa114f",
        "brand-blue": "#00e5ff",
        "surface": "#121414",
        "surface-container": "#1e2020",
        "on-surface": "#e2e2e2",
        "glass-bg": "rgba(255,255,255,0.05)",
      },
      borderRadius: {
        glass: "24px",
      },
    },
  },
  plugins: [],
};
