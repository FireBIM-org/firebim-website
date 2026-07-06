import type { Config } from "tailwindcss";

export default {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Flame orange — from the FireBIM logo gradient
        flame: {
          50: "#fef5ee",
          100: "#fde8d7",
          200: "#faceae",
          300: "#f7ab7b",
          400: "#f37e45",
          500: "#ef5b21",
          600: "#e04417",
          700: "#ba3214",
          800: "#942a18",
          900: "#782516",
          950: "#411009",
        },
        // Ink slate-blue — from the FireBIM logo disc
        ink: {
          50: "#f5f7fa",
          100: "#eaeff4",
          200: "#d1dde7",
          300: "#a9c0d2",
          400: "#7a9db8",
          500: "#5981a0",
          600: "#456885",
          700: "#455d75",
          800: "#3a4d61",
          900: "#2b3a4a",
          950: "#1c2733",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
