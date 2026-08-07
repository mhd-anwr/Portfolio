import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#090909",
        surface: "#111111",
        "surface-card": "#18181A",
        "surface-border": "#27272A",
        primary: "#FFFFFF",
        accent: {
          blue: "#4F8BFF",
          purple: "#B68DFF",
          yellow: "#FFE600",
        },
        muted: "#999999",
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta-sans)", "sans-serif"],
        display: ["var(--font-bricolage-grotesque)", "sans-serif"],
      },
      keyframes: {
        aurora: {
          "0%": { transform: "translate(0, 0) rotate(0deg)" },
          "50%": { transform: "translate(40px, -30px) rotate(180deg)" },
          "100%": { transform: "translate(0, 0) rotate(360deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
      },
      animation: {
        aurora: "aurora 18s ease-in-out infinite",
        marquee: "marquee 35s linear infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
