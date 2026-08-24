import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-montserrat)", "sans-serif"],
        display: ["var(--font-cormorant-garamond)", "serif"],
      },
      letterSpacing: {
        widestLuxury: "0.22em",
        ultraWide: "0.28em",
        tightSerif: "0.02em",
      },
      colors: {
        luxury: {
          black: "#121212",
          dark: "#1a1a1a",
          charcoal: "#2d2d2d",
          muted: "#666666",
          lightMuted: "#8e8e8e",
          cream: "#f5f4eb",
          warmStone: "#e5e1da",
          gold: "#c5a47e",
          goldLight: "#e2cfb4",
          emerald: "#0b5345",
        },
      },
    },
  },
  plugins: [],
};
export default config;
