/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#0f172a",
                foreground: "#f8fafc",
                primary: {
                    DEFAULT: "#6366f1",
                    hover: "#4f46e5",
                },
                card: "#1e293b",
                border: "#334155",
            }
        },
    },
    plugins: [],
}
