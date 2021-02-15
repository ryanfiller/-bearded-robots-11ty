var fetch = require('node-fetch')
var parser = require('xml2js').parseStringPromise

module.exports = async function() {
    const data =  await fetch('https://www.ryanfiller.com/blog/rss.xml?category=code')
    const xml = await data.text()
    const parsed = parser(xml).then(data => data.rss.channel[0])
    return parsed
}