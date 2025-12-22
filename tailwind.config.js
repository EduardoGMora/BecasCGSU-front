/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "Segoe UI", "Roboto", "Arial", "sans-serif"],
        display: ["Sora", "Inter", "system-ui", "Segoe UI", "Roboto", "Arial", "sans-serif"],
      },
      colors: {
        brand: {
          navy: "#182840",
          slate: "#406078",
          slate2: "#6080a0",
          cyan: "#55b5d6",
          cyan2: "#00d8f8",
          teal: "#00a098",
          purple: "#7958d8",
        },
        ui: {
          bg: "#f8f8f8",
          textInverse: "#ffffff",
          surface: "#e8e3f2",
          surfaceWarm: "#f7d2be",
          text: "#182840",
          textMuted: "#406078",
          textSubtle: "#6080a0",
          border: "#406078",
        },
        accent: {
          pink: "#f82890",
          magenta: "#bf51d8",
          mint: "#00f0a8",
        },
        status: {
          danger: "#e00048",
        },
      },
    },
  },
  plugins: [],
}