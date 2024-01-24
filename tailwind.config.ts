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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        primary: "#6b6bfa",
        secondary: "#91BEB1",
        tertiary: "#00FFD1",
        accent_bg: "#161719",
        accent_000: "#000",
        accent_111: "#36313e",
        accent_222: "#191919",
        accent_333: "#16171a",
        accent_444: "#f2e5d1",
        accent_555: "#F2F2F2",
        error: "#ff3b31",
        warning: "#ffcc01",
        success: "#34c759",
        accent_fff: "#fff",
      },
      fontFamily: {
        mono: ["var(--font-mono)"],
        sans: ["var(--font-inter)"],
        raleway: ["var(--font-raleway)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
