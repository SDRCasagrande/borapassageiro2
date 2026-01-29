/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                bora: {
                    blue: '#0070BA', // Main brand blue
                    dark: '#005596', // Darker blue for gradients
                    light: '#2997E1', // Lighter blue
                    green: '#25D366', // WhatsApp/Driver green
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
