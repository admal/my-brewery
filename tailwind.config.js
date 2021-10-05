//install: https://dev.to/angular/setup-tailwindcss-in-angular-the-easy-way-1i5l

module.exports = {
    prefix: '',
    purge: {
        content: [
            './src/**/*.{html,ts}',
        ]
    },
    // darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [require('@tailwindcss/forms')],
    purge: {
        enabled: process.env.NODE_ENV === 'production',
        content: [
            './src/**/*.{html,ts}',
        ]
    },
};