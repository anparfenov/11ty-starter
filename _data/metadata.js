const url = process.env.URL ?? "https://example.com";
const title = "Eleventy starter";

module.exports = {
    en: {
        url,
        title,
        description: "TODO",
        feed: {
            subtitle: "TODO",
            filename: "feed.xml",
            path: "/feed/en.feed.xml",
            id: "TODO",
        },
        jsonfeed: {
            path: "/feed/en.feed.json",
            url: `${url}/feed/en.feed.json`,
        },
        source: {
            icon: 'brand-github',
            label: 'github',
            link: 'TODO'
        },
        author: {
            url,
            name: "Your name",
            email: "example@mail.com",
        },
        posts: {
            title: `Posts | ${title}`,
            description: "Blog posts list",
        },
        about: {
            title: `About | ${title}`,
        },
    },
};
