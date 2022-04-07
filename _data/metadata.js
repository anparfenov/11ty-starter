const url = process.env.URL ? process.env.URL : "https://example.com";
const title = "HackerSpace PESUECC";

module.exports = {
    en: {
        url,
        title,
        description: "A Student-run Developer Community at PES University, Electronic City Campus",
        feed: {
            subtitle: "Hello, cultured RSS User! Welcome to our home on the internet",
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
            link: 'https://github.com/homebrew-ec-foss/homebrew-internethome'
        },
        author: {
            url,
            name: "Hackerspace PESUECC",
            email: "hackerspace.ecc@pes.edu",
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
