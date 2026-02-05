/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        popover: "hsl(0 0% 100%)",        // white background
        "popover-foreground": "hsl(222 47% 11%)",
        background: "hsl(0 0% 100%)",
        foreground: "hsl(222.2 47.4% 11.2%)",
        card: "var(--color-card)",
        muted: "hsl(210 40% 96.1%)",
        "muted-foreground": "hsl(215.4 16.3% 46.9%)",
        primary: "var(--color-primary)",
        "primary-foreground": "var(--color-primary-foreground)",
        accent: "var(--color-accent)",
        border: "var(--color-border)",
        input: "var(--color-input)",
        ring: "var(--color-ring)",
        success: "var(--color-success)",
      },
    },
  },
  plugins: [],
};
