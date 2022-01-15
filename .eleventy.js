const { DateTime } = require("luxon");
const fs = require("fs");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginNavigation = require("@11ty/eleventy-navigation");
const { markdownLibrary } = require("./.markdown.js");
const CleanCSS = require('clean-css');

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addPlugin(pluginSyntaxHighlight);
    eleventyConfig.addPlugin(pluginNavigation);

    // https://www.11ty.dev/docs/data-deep-merge/
    eleventyConfig.setDataDeepMerge(true);

    eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

    const getReadableDate = (locale, dateObj) => DateTime.fromJSDate(dateObj, {zone: 'utc', locale}).toFormat("dd LLL yyyy");

    eleventyConfig.addFilter("ru_readableDate", dateObj => {
        return getReadableDate('ru', dateObj);
    });

    eleventyConfig.addFilter("en_readableDate", dateObj => {
        return getReadableDate('en', dateObj);
    });

    // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
        return DateTime.fromJSDate(dateObj, {zone: 'utc', locale: 'ru'}).toFormat('yyyy-LL-dd');
    });

    eleventyConfig.addFilter("head", (array, n) => {
        if( n < 0 ) {
            return array.slice(n);
        }

        return array.slice(0, n);
    });

    eleventyConfig.addFilter("min", (...numbers) => {
        return Math.min.apply(null, numbers);
    });

    eleventyConfig.addFilter("filterTagList", tags => {
        return (tags || []).filter(tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1);
    })

    eleventyConfig.addFilter("keys", obj => Object.keys(obj));

    eleventyConfig.addFilter("cssmin", (code) => {
        return new CleanCSS({}).minify(code);
    })

    eleventyConfig.addCollection("tagList", function(collection) {
        let tagSet = new Set();
        collection.getAll().forEach(item => {
            (item.data.tags || []).forEach(tag => tagSet.add(tag));
        });

        return [...tagSet];
    });

    eleventyConfig.addPassthroughCopy("static");
    eleventyConfig.addPassthroughCopy("./src/assets/css/prism.css");

    const jsAssetsFiles = "./src/**/*.js"
    const cssAssetsFiles = "./src/assets/css/**/*.scss"
    const mdAssetsFiles = "./src/**/*.md"
    eleventyConfig.addWatchTarget(jsAssetsFiles)
    eleventyConfig.addWatchTarget(cssAssetsFiles)
    eleventyConfig.addWatchTarget(mdAssetsFiles)

    eleventyConfig.setLibrary("md", markdownLibrary);

    eleventyConfig.setBrowserSyncConfig({
        files: '*',
        ignore: ['_site', '.gitignore', 'node_modules'],
        callbacks: {
            ready: function(err, browserSync) {
                const content_404 = fs.readFileSync('_site/404.html');

                browserSync.addMiddleware("*", (req, res) => {
                    // Provides the 404 content without redirect.
                    res.writeHead(404, {"Content-Type": "text/html; charset=UTF-8"});
                    res.write(content_404);
                    res.end();
                });
            },
        },
        ui: false,
        ghostMode: false
    });

    return {
        templateFormats: [
            "md",
            "njk",
            "html",
        ],

        pathPrefix: "/",
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        dataTemplateEngine: false,

        dir: {
            input: "src",
            includes: "_includes",
            data: "../_data",
        }
    };
};
