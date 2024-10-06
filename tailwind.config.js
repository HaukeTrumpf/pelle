/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['"Inter"'],
        'caslon-display': ['"Caslon"', 'serif'],
        'clash-extralight': ['"ClashDisplay-Extralight"', 'sans-serif'],
        'clash-light': ['"ClashDisplay-Light"', 'sans-serif'],
        'clash-regular': ['"ClashDisplay-Regular"', 'sans-serif'],
        'clash-medium': ['"ClashDisplay-Medium"', 'sans-serif'],
        'clash-semibold': ['"ClashDisplay-Semibold"', 'sans-serif'],
        'clash-bold': ['"ClashDisplay-Bold"', 'sans-serif'],
        'clash-variable': ['"ClashDisplay-Variable"', 'sans-serif'],

        'archivo-thin': ['"Archivo-Thin"', 'sans-serif'],
        'archivo-thin-italic': ['"Archivo-ThinItalic"', 'sans-serif'],
        'archivo-extralight': ['"Archivo-ExtraLight"', 'sans-serif'],
        'archivo-extralight-italic': [
          '"Archivo-ExtraLightItalic"',
          'sans-serif',
        ],
        'archivo-light': ['"Archivo-Light"', 'sans-serif'],
        'archivo-light-italic': ['"Archivo-LightItalic"', 'sans-serif'],
        'archivo-regular': ['"Archivo-Regular"', 'sans-serif'],
        'archivo-italic': ['"Archivo-Italic"', 'sans-serif'],
        'archivo-medium': ['"Archivo-Medium"', 'sans-serif'],
        'archivo-medium-italic': ['"Archivo-MediumItalic"', 'sans-serif'],
        'archivo-semibold': ['"Archivo-SemiBold"', 'sans-serif'],
        'archivo-semibold-italic': ['"Archivo-SemiBoldItalic"', 'sans-serif'],
        'archivo-bold': ['"Archivo-Bold"', 'sans-serif'],
        'archivo-bold-italic': ['"Archivo-BoldItalic"', 'sans-serif'],
        'archivo-extrabold': ['"Archivo-ExtraBold"', 'sans-serif'],
        'archivo-extrabold-italic': ['"Archivo-ExtraBoldItalic"', 'sans-serif'],
        'archivo-black': ['"Archivo-Black"', 'sans-serif'],
        'archivo-black-italic': ['"Archivo-BlackItalic"', 'sans-serif'],
        'archivo-variable': ['"Archivo-Variable"', 'sans-serif'],
        'archivo-variable-italic': ['"Archivo-VariableItalic"', 'sans-serif'],
      },
      textColor: {
        'brand-blue': '#3d87aa',
        'brand-yellow': '#fcec8a',
        'brand-red': '#eb795d',
      },
      colors: {
        'brand-blue': '#3d87aa',
        'brand-yellow': '#fcec8a',
        'brand-red': '#eb795d',
        'off-white': '#f4f0db',
      },
      width: {
        '8xl': '160rem',
      },
      screens: {
        '3xl': '2000px',
      },
    },
  },
  plugins: [],
};
