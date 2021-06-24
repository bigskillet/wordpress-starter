const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: ['./**/*.php'],
  theme: {
    screens: {
      'xs': '375px',
      ...defaultTheme.screens,
    },
    fontFamily: {
      body: ['sans-serif'],
      display: []
    },
    colors: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio')
  ],
}
