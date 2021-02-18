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
        dark: 'var(--black)',
        light: 'var(--white)',
        highlight: 'var(--highlight)',
        transparent: 'var(--transparent)'
      }
    },
  },
  variants: {},
  plugins: []
}
