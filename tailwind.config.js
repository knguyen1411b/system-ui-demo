/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                'mb-purple': { 400: '#a78bfa', 500: '#8b5cf6', 600: '#7c3aed' },
                'mb-dark': '#0f172a',
                'mb-light': '#c4b5fd',
                'mb-main': '#8b5cf6',
                'mb-dark-p': '#6d28d9',
                'mb-deep': '#1e1b4b'
            }
        }
    },
    plugins: []
}
