const { DateTime } = require("luxon");
const fs = require("fs");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginNavigation = require("@11ty/eleventy-navigation");
const { markdownLibrary } = require("./.markdown.js");
const CleanCSS = require('clean-css');
const Image = require("@11ty/eleventy-img");
const glob = require("glob-promise");
const { path } = require("animejs");

const FULL = 1600;
const THUMB = 300;

function getFilename(filenameIncludingPath) {
    return filenameIncludingPath.split('/').pop();
}

function getRelativeImageLocation(filenameIncludingPath) {
    let filepathComponents = filenameIncludingPath.split('/');
    return filepathComponents.slice(2,-1).join('/');
}

function getPostFolder(filenameIncludingPath) {
    parts = filenameIncludingPath.split('/');
    postFolder = parts.at(-3);
    return postFolder;
}

function getFilenameWithoutExtensin(filenameIncludingPath) {
    let filename = getFilename(filenameIncludingPath);
    let parts = filename.split('.');
    parts.pop();
    return parts.join('.');
}

async function generateImages() {

	let options = {
		widths: [FULL, THUMB],
		formats: ['jpeg'],
		filenameFormat:function(id, src, width, format, options) {
			let origFilename = getFilename(src);
			let parts = origFilename.split('.');
			parts.pop();
			origFilename = parts.join('.');

            let filenameWithoutExtension = getFilenameWithoutExtensin(src)
            if (width == THUMB)
            {
                return `thumbnail-${filenameWithoutExtension}.${format}`;
            }
            else
            {
                return `${filenameWithoutExtension}.${format}`;
            }
		}
	};

	let files = await glob('./src/**/media/*.{jpg,jpeg,png,gif,JPG,JPEG,PNG,GIF}');

	for(const f of files) {
		console.log('image processing: ',f);

        options.outputDir = '_site/' + getRelativeImageLocation(f);

		let md = await Image(f, options);
	};

};

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
            return array.slice(n).reverse();
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

    eleventyConfig.addCollection('images', async collectionApi => {

		let files = await glob('**/_site/posts/**/media/*.jpeg');

        //Now filter to non thumb-
		let images = files.filter(f => {
			return f.indexOf('media/thumbnail-') === -1;
		});

        let collection = []

        for (let i = 0; i < images.length; i++) {
            let options = {
                statsOnly: true,
                formats: ['jpeg']
            };
            
            md = await Image(images[i], options);
            
            c = {
                fullPath: images[i],
                postfolder: getPostFolder(images[i]),
				filename: getFilename(images[i]),
                width: md.jpeg[0].width,
                height: md.jpeg[0].height              
            };

            console.log(i);
            console.log(c);

            collection.push(c);
        }

		return collection;
	});
    eleventyConfig.addCollection('gpx', async collectionApi => {
        let files = await glob('**/src/posts/**/gpx/*.gpx');

        let collection = [];

        for (let i = 0; i < files.length; i++) {      
            c = {
                fullPath: files[i],
                postfolder: getPostFolder(files[i]),
				filename: getFilename(files[i])             
            };

            console.log(i);
            console.log(c);

            collection.push(c);
        }


        return collection;
    });

    eleventyConfig.addPassthroughCopy("static");
    eleventyConfig.addPassthroughCopy("./src/posts/**/*.gpx");
    eleventyConfig.addPassthroughCopy("./src/assets/css/prism.css");
    eleventyConfig.addPassthroughCopy({"./node_modules/photoswipe/dist": "/assets/photoswipe"});

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

    eleventyConfig.on('beforeBuild', async () => {
		console.log('beforeBuild');
		await generateImages();
		console.log('images done');
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
