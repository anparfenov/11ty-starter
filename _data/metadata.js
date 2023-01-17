const url = process.env.URL ?? "https://example.com";
const title = "Heidelbergs Finest";

module.exports = {
    en: {
        url,
        title,
        description: "Wir ballern.",
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
            label: 'github',
            link: 'https://github.com/moody-person/11ty-starter'
        },
        author: {
            url,
            name: "HDF",
            email: "hdf+markbangert@mail.com",
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
