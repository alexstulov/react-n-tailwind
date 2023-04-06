/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                'old-calc-red': '#ac3e32',
                'old-calc-brown': '#60433a',
                'old-calc-grey': '#87817e',
                'old-calc-green': '#6c6847',
            },
        },
    },
    plugins: [require('@tailwindcss/typography'), require('daisyui')],
}
