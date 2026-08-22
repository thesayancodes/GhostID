import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#08090D",
        surface: {
          DEFAULT: "#0F111A",
          lighter: "#181B29",
          border: "#23283E",
          hover: "#1E2235",
        },
        ghost: {
          50: "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#6366F1", // Primary indigo
          600: "#4F46E5",
          700: "#4338CA",
          800: "#3730A3",
          900: "#312E81",
        },
        midnight: {
          accent: "#8B5CF6", // Purple
          cyan: "#06B6D4",   // Cyan / Proof beam
          emerald: "#10B981",// Verified green
          amber: "#F59E0B",  // Warning / Expiring
          rose: "#F43F5E",   // Revoked / Danger
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "monospace"],
      },
      boxShadow: {
        "glow-indigo": "0 0 35px -5px rgba(99, 102, 241, 0.3)",
        "glow-cyan": "0 0 35px -5px rgba(6, 182, 212, 0.3)",
        "glow-purple": "0 0 35px -5px rgba(139, 92, 246, 0.3)",
        "glow-emerald": "0 0 35px -5px rgba(16, 185, 129, 0.3)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "scan": "scan 3s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        }
      }
    },
  },
  plugins: [],
};

export default config;
