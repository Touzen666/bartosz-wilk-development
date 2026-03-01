import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        charcoal: "#1e293b",
        "charcoal-soft": "#334155",
        offwhite: "#f8fafc",
        "offwhite-warm": "#f1f5f9",
        amber: "#d97706",
        "amber-hover": "#b45309",
        "amber-light": "#fef3c7",
        border: "#e2e8f0",
        "border-strong": "#cbd5e1",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "wp-sm": "0.375rem",
        "wp-md": "0.5rem",
        "wp-lg": "0.75rem",
        "wp-xl": "1rem",
        "wp-2xl": "1.25rem",
      },
      boxShadow: {
        "wp-sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "wp-md": "0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.05)",
        "wp-lg": "0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.05)",
        "wp-card": "0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.04)",
        "wp-card-hover": "0 10px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.04)",
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
      transitionTimingFunction: {
        DEFAULT: "ease",
      },
      maxWidth: {
        "content": "75rem",
        "prose": "65ch",
      },
    },
  },
  plugins: [],
};

export default config;
