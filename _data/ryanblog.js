var fetch = require('node-fetch')
var parser = require('xml2js').parseStringPromise

module.exports = async function() {
    const data =  await fetch('https://www.ryanfiller.com/blog/rss.xml?category=code')
    const xml = await data.text()
    const parsed = await parser(xml).then(data => data.rss.channel[0])

    const videoFixer = (_match, url, alt) => {
        return `
        <video controls="" loop="" autoplay="">
            <source src="${url}" type="video/mp4"><br>
            Sorry, your browser doesn't support embedded videos.<br>
            <track kind="descriptions" label="${alt || ''}" />
        </video>
        `
    }

    const imageResizer = (_match, url, alt) => {
        return `<a class='img-link' href="${url}" target="_blank" rel="noopener">
            <img src="${url}?nf_resize=fit&w=750" alt="${alt}">
        </a>`
    }

    // wtf is up with the format of this...
    const formatted = {
        title: 'ryanblog',
        url: parsed.link[0].trim().replace('/blog', ''),
        description: parsed.description[0].trim(),
        update: new Date(parsed.lastBuildDate[0].trim()).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric' }),
        image: {
            src: parsed.image[0].url[0].trim(),
            alt: `${parsed.webMaster[0].trim().match(/\((.*)\)/)[1]} image`
        },
        author: parsed.webMaster[0].trim().match(/\((.*)\)/)[1],
        email: parsed.webMaster[0].trim().match(/(.*)\@(.*).com/)[0],
        posts: parsed.item.map(item => ({
            title: item.title[0].trim().replace(/\((.*) Series\)/, ''),
            series: item.title[0].trim().match(/\((.*) Series\)/) ? item.title[0].trim().match(/\((.*) Series\)/)[1] : '',
            url: item.link[0].trim().replace('https://www.ryanfiller.com/blog/', ''),
            date: new Date(item.pubDate[0].trim()).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric' }),
            image: {
                src: item.enclosure[0]['$'].url.trim(),
                alt: `${item.title[0].trim()} banner image`
            },
            categories: item.category,
            excerpt: item.description[0].trim(),
            html: item['content:encoded'][0]
                .replace(/\<img src="(.*\.mp4)" alt="(.*)"\>/g, videoFixer)
                .replace(/\<img src="(.*\.(jpg|jpeg|png))" alt="(.*)"\>/g, imageResizer)
        }))
    }

    return formatted
}