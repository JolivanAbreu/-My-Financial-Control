// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}', // Garanta que esta linha está correta
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}