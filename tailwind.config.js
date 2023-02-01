/** @type {import('tailwindcss').Config} */
module.exports = {
    // content: ['html'],
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [require('daisyui')],
}
