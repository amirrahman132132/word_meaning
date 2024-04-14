/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx}"],
    theme: {
        screens: {
            "sm": "576px",
            "md": "768px",
            "lg": "992px",
            "xl": "1280px",
            "2xl": "1400px",
        },
        extend: {
            spacing: {
                "1": "var(--space-1)",
                "2": "var(--space-2)",
                "3": "var(--space-3)",
                "4": "var(--space-4)",
                "5": "var(--space-5)",
                "6": "var(--space-6)",
                "7": "var(--space-7)",
                "8": "var(--space-8)",
                "9": "var(--space-9)"
            },
            colors: {
                "accent": {
                    "1": "var(--accent-a1)",
                    "2": "var(--accent-a2)",
                    "3": "var(--accent-a3)",
                    "4": "var(--accent-a4)",
                    "5": "var(--accent-a5)",
                    "6": "var(--accent-a6)",
                    "7": "var(--accent-a7)",
                    "8": "var(--accent-a8)",
                    "9": "var(--accent-a9)",
                    "10": "var(--accent-a10)",
                    "11": "var(--accent-a11)",
                    "12": "var(--accent-a12)",
                },
                "gray": {
                    "1": "var(--gray-a1)",
                    "2": "var(--gray-a2)",
                    "3": "var(--gray-a3)",
                    "4": "var(--gray-a4)",
                    "5": "var(--gray-a5)",
                    "6": "var(--gray-a6)",
                    "7": "var(--gray-a7)",
                    "8": "var(--gray-a8)",
                    "9": "var(--gray-a9)",
                    "10": "var(--gray-a10)",
                    "11": "var(--gray-a11)",
                    "12": "var(--gray-a12)",
                },
            },
            borderRadius: {
                "1": "var(--radius-1)",
                "2": "var(--radius-2)",
                "3": "var(--radius-3)",
                "4": "var(--radius-4)",
                "5": "var(--radius-5)",
                "6": "var(--radius-6)",
            },
            boxShadow: {
                "1": "var(--shadow-1)",
                "2": "var(--shadow-2)",
                "3": "var(--shadow-3)",
                "4": "var(--shadow-4)",
                "5": "var(--shadow-5)",
                "6": "var(--shadow-6)",
            }
        }
        // colors
    },
    plugins: [],
}
