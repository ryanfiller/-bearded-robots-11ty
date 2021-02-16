module.exports = {
  purge: {
    content: ["_site/**/*.html"],
    options: {
      safelist: [],
    },
  },
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        dark: 'black',
        light: 'white',
        highlight: 'red'
      }
    }
  },
  variants: {},
  plugins: []
}
