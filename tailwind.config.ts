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
        void: "#06070C",
        background: "#06070C",
        surface: {
          DEFAULT: "#12142B",
          raised: "#1B1E3D",
          lighter: "#1B1E3D",
          border: "rgba(124, 111, 242, 0.15)",
          hover: "#1F2347",
        },
        spectral: {
          violet: "#7C6FF2",
          "violet-glow": "rgba(124, 111, 242, 0.35)",
          "violet-subtle": "rgba(124, 111, 242, 0.12)",
        },
        phantom: {
          cyan: "#5EEAD4",
          "cyan-glow": "rgba(94, 234, 212, 0.35)",
          "cyan-subtle": "rgba(94, 234, 212, 0.12)",
        },
        ember: {
          DEFAULT: "#F5A56B",
          glow: "rgba(245, 165, 107, 0.35)",
          subtle: "rgba(245, 165, 107, 0.12)",
        },
        fog: {
          DEFAULT: "#E8E6F5",
          dim: "#9B9BB8",
          subtle: "#6A6A8C",
        },
        danger: {
          glitch: "#E2555C",
          "glitch-glow": "rgba(226, 85, 92, 0.35)",
        },
        // Backward-compatibility aliases mapped to new spectral system
        ghost: {
          50: "#F5F4FD",
          100: "#E8E6F5",
          200: "#D1CDF0",
          300: "#B3ACEE",
          400: "#968CE8",
          500: "#7C6FF2", // Spectral violet primary
          600: "#6B5CE7",
          700: "#5848D0",
          800: "#4436B0",
          900: "#2B227A",
          950: "#141040",
        },
        midnight: {
          accent: "#7C6FF2",
          cyan: "#5EEAD4",
          emerald: "#5EEAD4", // Verified state maps to phantom cyan
          amber: "#F5A56B",  // Ember
          rose: "#E2555C",   // Danger glitch
        }
      },
      fontFamily: {
        sans: ["var(--font-satoshi)", "Satoshi", "General Sans", "system-ui", "sans-serif"],
        display: ["var(--font-cabinet)", "Cabinet Grotesk", "Clash Display", "Satoshi", "sans-serif"],
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "IBM Plex Mono", "monospace"],
      },
      boxShadow: {
        "glow-spectral": "0 0 35px -5px rgba(124, 111, 242, 0.4)",
        "glow-phantom": "0 0 35px -5px rgba(94, 234, 212, 0.35)",
        "glow-ember": "0 0 35px -5px rgba(245, 165, 107, 0.35)",
        "glow-glitch": "0 0 35px -5px rgba(226, 85, 92, 0.35)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.5)",
        // Backward-compat aliases
        "glow-indigo": "0 0 35px -5px rgba(124, 111, 242, 0.4)",
        "glow-cyan": "0 0 35px -5px rgba(94, 234, 212, 0.35)",
        "glow-purple": "0 0 35px -5px rgba(124, 111, 242, 0.4)",
        "glow-emerald": "0 0 35px -5px rgba(94, 234, 212, 0.35)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "scan": "scan 3s linear infinite",
        "data-leak": "data-leak-flicker 2.5s infinite ease-in-out",
        "hero-glow": "spectral-hero-pulse 3s infinite ease-in-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
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
