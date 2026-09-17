import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        farm: {
          50: "#f0f7eb",
          100: "#dcefd2",
          200: "#b9dfaa",
          300: "#8ec978",
          400: "#6aad4e",
          500: "#80A541",
          600: "#5a7a2e",
          700: "#4a6a24",
          800: "#3a5a1a",
          900: "#2a4a10",
        },
        earth: {
          50: "#fdf8f0",
          100: "#f9eddb",
          200: "#f2d7b0",
          300: "#e8bb7a",
          400: "#dfa04e",
          500: "#d4872a",
          600: "#b86d1f",
          700: "#95541c",
          800: "#7a441d",
          900: "#65391c",
        },
        cream: {
          50: "#fefdfb",
          100: "#fcf9f2",
          200: "#f8f0e0",
          300: "#f2e4c8",
          400: "#e9d3a5",
          500: "#dfc082",
        },
      },
      fontFamily: {
        heading: ["Inter", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
