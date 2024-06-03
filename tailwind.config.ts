import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    './assets/**/*.{css,scss}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          100: "#F0F4FF",
          200: "#D9E6FF",
          300: "#A6C1FF",
          400: "#598BFF",
          500: "#3366FF",
          600: "#274BDB",
          700: "#1A34B8",
          800: "#102694",
          900: "#091A7A",
        },
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [],
};
export default config;
