module.exports = {
  plugins: [
    require(`tailwindcss`)(`./styles/tailwind.config.js`),
    require(`postcss-nesting`),
    require(`autoprefixer`)
  ]
}
