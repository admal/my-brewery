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
        extend: {
            colors: {
                black: "#0c0f0aff", //text
                primary: "#ffc457ff", //backgrounds, headers etc
                "primary-dark": "#D68B00",
                white: "#ffffffff", //background
                green: "#00cc66ff", //success
                red: "#f45b69ff" //error
            }
        },
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