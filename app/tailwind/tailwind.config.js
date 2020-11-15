/* eslint-disable no-undef */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    future: {
        // removeDeprecatedGapUtilities: true,
        // purgeLayersByDefault: true,
        // defaultLineHeights: true,
        // standardFontWeights: true
    },
    purge: [],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                sky: {
                    100: '#e6f0fb',
                    200: '#bad5f5',
                    300: '#8dbbef',
                    400: '#61a0e8',
                    500: '#3485e2',
                    600: '#1c6cc7',
                    700: '#16539a',
                    800: '#103b6d',
                    900: '#092341',
                },
                nightsky: {
                    100: '#0d2f57',
                    200: '#092340',
                    300: '#06172a',
                    400: '#030b14',
                },
                midnight: {
                    100: '#555555',
                    200: '#484848',
                    300: '#3b3b3b',
                    400: '#2e2e2e',
                    500: '#222222',
                    600: '#151515',
                    700: '#080808',
                },
                moregray: {
                    750: '#283345',
                    850: '#212a38',
                },
            },
            boxShadow: {
                'light-xs': '0 0 0 1px rgba(212,220,236, 0.05)',
                'light-sm': '0 1px 2px 0 rgba(212,220,236, 0.05)',
                light: '0 1px 3px 0 rgba(212,220,236, 0.1), 0 1px 2px 0 rgba(212,220,236, 0.06)',
                'light-md': '0 4px 6px -1px rgba(212,220,236, 0.1), 0 2px 4px -1px rgba(212,220,236, 0.06)',
                'light-lg': '0 10px 15px -3px rgba(212,220,236, 0.1), 0 4px 6px -2px rgba(212,220,236, 0.05)',
                'light-xl': '0 20px 25px -5px rgba(212,220,236, 0.1), 0 10px 10px -5px rgba(212,220,236, 0.04)',
                'light-2xl': '0 25px 50px -12px rgba(212,220,236, 0.25)',
                'light-3xl': '0 35px 60px -15px rgba(212,220,236, 0.3)',
                // 'light': '0 1px 3px rgba(219,226,239,.5), 0 1px 2px rgba(219,226,239,.5)',
                pop: '0 0 2.25rem #d4dcec',
                'pop-less': '0 0 1rem #d4dcec',
                'pop-lesser': '0 0 .5rem #d4dcec',
                'pop-least': '0 0 .25rem #d4dcec',
                'dark-overlay': '-5px 10px 13px 3px rgba(0,0,0,0.3)',
                'dark-overlay-gray': '-5px 10px 13px 3px rgba(26, 32, 44, .5)',
                'overlay-inner': 'inset 0 1px 5px 0 rgba(0, 0, 0, 0.3)',
            },
            width: {
                70: '18rem',
                74: '22rem',
                78: '26rem',
                82: '28rem',
                86: '30rem',
            },
            height: {
                70: '18rem',
                74: '22rem',
                78: '26rem',
                82: '28rem',
                86: '30rem',
            },
            spacing: {
                70: '18rem',
                74: '22rem',
                78: '26rem',
                82: '28rem',
                86: '30rem',
            },
        },
        darkSelector: '[data-theme="dark"]',
    },
    variants: {
        boxShadow: ['responsive', 'hover', 'focus', 'group-focus', 'dark'],
        backgroundColor: ['responsive', 'hover', 'focus', 'dark', 'dark-hover', 'dark-group-hover', 'dark-even', 'dark-odd'],
        borderColor: ['responsive', 'hover', 'focus', 'dark', 'dark-disabled', 'dark-focus', 'dark-focus-within'],
        textColor: ['responsive', 'hover', 'focus', 'dark', 'dark-hover', 'dark-active', 'dark-placeholder'],
        maxWidth: ['responsive', 'hover', 'focus'],
    },
    corePlugins: {
        divideWidth: true,
    },
    plugins: [require('@tailwindcss/ui'), require('@tailwindcss/custom-forms'), require('tailwindcss-dark-mode')()],
};
