import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // KinkMap Brand Colors
        primary: {
          DEFAULT: "#d32f2f",
          50: "#fef2f2",
          100: "#fee2e2",
          500: "#d32f2f",
          600: "#b71c1c",
          700: "#991b1b",
        },
        background: {
          primary: "#0a0a0a",
          secondary: "#1a1a1a",
          tertiary: "#2a2a2a",
        },
        text: {
          primary: "#ffffff",
          secondary: "#888888",
          muted: "#666666",
        },
        border: {
          DEFAULT: "#333333",
          light: "#444444",
        },
        success: "#4ecdc4",
        warning: "#feca57",
        accent: "#ff6b6b",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "system-ui",
          "sans-serif",
        ],
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
      },
      borderRadius: {
        xl: "16px",
        "2xl": "20px",
      },
      boxShadow: {
        card: "0 8px 32px rgba(0,0,0,0.3)",
        modal: "0 20px 60px rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
