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
                    blue: '#0070BA',
                    dark: '#005596',
                    light: '#2997E1',
                    green: '#25D366',
                    orange: '#FF6B00',
                    accent: '#FFD60A',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Space Grotesk', 'Inter', 'sans-serif'],
            },
            animation: {
                'float': 'float 3s ease-in-out infinite',
                'slide-up': 'slide-up 0.6s ease-out',
            },
        },
    },
    plugins: [],
}
