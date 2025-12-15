/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                card: "hsl(var(--card))",
                "card-foreground": "hsl(var(--card-foreground))",
                popover: "hsl(var(--popover))",
                "popover-foreground": "hsl(var(--popover-foreground))",
                primary: "hsl(var(--primary))",
                "primary-foreground": "hsl(var(--primary-foreground))",
                secondary: "hsl(var(--secondary))",
                "secondary-foreground": "hsl(var(--secondary-foreground))",
                muted: "hsl(var(--muted))",
                "muted-foreground": "hsl(var(--muted-foreground))",
                accent: "hsl(var(--accent))",
                "accent-foreground": "hsl(var(--accent-foreground))",
                destructive: "hsl(var(--destructive))",
                "destructive-foreground": "hsl(var(--destructive-foreground))",
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                // Motion Mechanics (Primary) - Professional Green
                "brand-dark": "#0d4826",
                "brand-base": "#167a42",
                "brand-light": "#3cb06f",
                "brand-extralight": "#e7f7ed",
                // Purrfect Universe (Radical Highlights)
                "brand-secondary": "#f97316", // Radical Orange
                "brand-secondary-light": "#fdba74",
                "brand-wood": "#854d0e", // Wood Brown
                "brand-highlight": "#2563eb", // Highlight Blue
                "brand-highlight-light": "#60a5fa",
                "brand-red": "#ef4444",
                "brand-red-light": "#f87171",
            },
        },
    },
    plugins: [],
}
