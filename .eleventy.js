module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false)

  eleventyConfig.addWatchTarget("./_tmp/style.css")

  eleventyConfig.addPassthroughCopy({ "./_tmp/style.css": "./style.css" })

  eleventyConfig.addPassthroughCopy("favicon.ico")

  eleventyConfig.addShortcode("version", function () {
    return String(Date.now())
  })
}
