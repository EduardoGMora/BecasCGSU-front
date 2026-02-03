/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Colores primary
    'bg-primary-mint',
    'bg-primary-cyan',
    'bg-primary-purple',
    'bg-primary-pink',
    'bg-primary-slate',
    'text-primary-mint',
    'text-primary-cyan',
    'text-primary-purple',
    'text-primary-pink',
    'text-primary-slate',
    'border-primary-mint',
    'border-primary-cyan',
    'border-primary-purple',
    'border-primary-pink',
    'border-primary-slate',
    'hover:bg-primary-mint',
    'hover:bg-primary-cyan',
    'hover:bg-primary-purple',
    'hover:bg-primary-pink',
    'hover:bg-primary-slate',
    'hover:text-primary-mint',
    'hover:text-primary-cyan',
    'hover:text-primary-purple',
    'hover:text-primary-pink',
    'hover:text-primary-slate',
    // Colores brand
    'bg-brand-navy',
    'bg-brand-slate',
    'bg-brand-slate2',
    'bg-brand-cyan',
    'bg-brand-cyan2',
    'bg-brand-teal',
    'bg-brand-purple',
    'text-brand-navy',
    'text-brand-slate',
    'text-brand-slate2',
    'text-brand-cyan',
    'text-brand-cyan2',
    'text-brand-teal',
    'text-brand-purple',
    'border-brand-navy',
    'border-brand-slate',
    'border-brand-slate2',
    'border-brand-cyan',
    'border-brand-cyan2',
    'border-brand-teal',
    'border-brand-purple',
    // Colores accent
    'bg-accent-pink',
    'bg-accent-magenta',
    'bg-accent-mint',
    'bg-accent-cyan',
    'text-accent-pink',
    'text-accent-magenta',
    'text-accent-mint',
    'text-accent-cyan',
    'border-accent-pink',
    'border-accent-magenta',
    'border-accent-mint',
    'border-accent-cyan',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "Segoe UI", "Roboto", "Arial", "sans-serif"],
        display: ["Sora", "Inter", "system-ui", "Segoe UI", "Roboto", "Arial", "sans-serif"],
      },
      colors: {
        primary: {
          mint: "#31f5ac",      // Verde/turquesa vibrante
          cyan: "#3cdaf9",      // Azul cyan brillante
          purple: "#832ea8",    // Morado profundo
          pink: "#fa2d96",      // Rosa fucsia
          slate: "#48627d",     // Azul grisáceo
        },
        // Colores de marca basados en la paleta principal
        brand: {
          navy: "#48627d",      // Usando el azul grisáceo
          slate: "#48627d",
          slate2: "#6080a0",
          cyan: "#3cdaf9",
          cyan2: "#3cdaf9",
          teal: "#31f5ac",
          purple: "#832ea8",
        },
        ui: {
          bg: "#f8f8f8",
          textInverse: "#ffffff",
          surface: "#e8e3f2",
          surfaceWarm: "#f7d2be",
          text: "#48627d",
          textMuted: "#48627d",
          textSubtle: "#6080a0",
          border: "#48627d",
        },
        accent: {
          pink: "#fa2d96",
          magenta: "#832ea8",
          mint: "#31f5ac",
          cyan: "#3cdaf9",
        },
        status: {
          danger: "#e00048",
        },
      },
    },
  },
  plugins: [],
}