/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        forest: { DEFAULT: "#16422B", soft: "#235C3E", dark: "#0E2E1D" },
        sand: { DEFAULT: "#EFE9DC", warm: "#E5DEC9" },
        navy: { DEFAULT: "#14281D", soft: "#3B4F43" },
        teal: { DEFAULT: "#1B5E43", dark: "#134531" },
        paper: {
          DEFAULT: "#EFE9DC",
          card: "#F8F5EE",
          field: "#EAE3D2",
          chip: "#E2D9C5",
        },
        edge: "#D3C8B2",
      },
      keyframes: {
        popDown: {
          "0%": { opacity: "0", transform: "translateY(-10px) scale(0.92)" },
          "70%": { opacity: "1", transform: "translateY(2px) scale(1.015)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        fade: { from: { opacity: "0" }, to: { opacity: "1" } },
      },
      animation: {
        popDown: "popDown 0.19s cubic-bezier(0.22, 1.35, 0.36, 1)",
        fade: "fade 0.14s ease-out",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};