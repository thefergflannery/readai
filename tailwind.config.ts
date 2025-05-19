import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00c9a7",
        background: "#f9fafb",
        card: {
          DEFAULT: "#ffffff",
          foreground: "#111827",
        },
        input: "#e5e7eb",
        ring: "#00c9a7",
        muted: {
          DEFAULT: "#6b7280",
          foreground: "#9ca3af",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
}

export default config 