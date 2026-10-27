
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
        gold: {
          DEFAULT: "#f0ab44",
          light: "#ffd07a",
          dark: "#b87a1d",
        },
        cream: {
          DEFAULT: "#f7f5f0",
          heading: "#EEEEA2",
        },
        warmgrey: {
          DEFAULT: "#AAA59B",
          body: "#AAA59B",
          secondary: "#AAA59B",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Manrope", "system-ui", "-apple-system", "sans-serif"],
        mono: ["Manrope", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
