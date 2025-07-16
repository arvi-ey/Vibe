export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                rubik: ['Rubik', 'sans-serif'],
                opensans: ['"Open Sans"', 'sans-serif'],
            },
        },
        screens: {
            '3xs': '320px',
            '2xs': '360px',
            'xsm': '400px',
        },
    },
    plugins: [],
}
