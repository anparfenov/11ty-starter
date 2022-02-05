## 11ty-starter

This is [eleventy](https://11ty.dev) starter.

It uses [sass](https://sass-lang.com/), [nunjucks](https://mozilla.github.io/nunjucks/), [rollup](https://rollupjs.org/guide/en/).

It also has i18n support.

[DEMO](https://moody-person.github.io/11ty-starter/) on github pages

## Installation

You can init repo with this template.

[How to create project from a template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template)

Or just clone this repo, remove .git directory and init with your own git repo.

## File stucture

src/en - put your pages here. For other language create directory named {lang}.json for example and add {lang}.json file.

``` json
{
    "locale": "lang"
}
```

src/posts/en - your posts

src/_includes/pages - pages layouts. Create your pages here and export them in src/en directory files.

src/_inlcudes/layouts - layouts.

- `base.njk` - main layout with head, header, main, footer sections.
- `post.njk` - layout for post using `base` layout.
- `about.njk` - layout for about page. With markdown content.
- `home.njk` - layout for all other pages.

src/assets - your css and js

src/assets/css

- `components` - sass components. `c` prefix.
- `layouts` - grid, flexbox layouts. `l` prefix.
- `pages` - styles for pages. `p` prefix.
- `utilties` - utility styles like u-mr--8 (margin-right: 0.5rem). `u` prefix.

- `base.scss` - base html elements styles.
- `functions.scss` - sass functions.
- `mixins.scss` - sass mixins.
- `prism.scss` - [prism](https://prismjs.com/) tomorrow night colorscheme
- `reset.scss` - [reset](https://meyerweb.com/eric/tools/css/reset/)
- `settings.scss` - css variables.
- `variables.scss` - sass variables.

src/assets/js - example index.js file. You can remove it, if you don't need js. Don't forget to remove `rollup`, `rollup-plugin-terser` and `@rollup/plugin-node-resolve` dependencies. Also remove `<script>` tag from `_includes/layouts/base.njk`

static - static files are copied directly to `/_site`.

_data - data files with translations for each page, metadata and other stuff.

## Deploy

### Github pages

Edit `build:eleventy:pathPrefix` in package.json.

change path prefix option `--pathprefix=your-repo-name`

### Caddy

``` nginx
domainname.com {
    root * ~/_site # or whatever site directory
    file_server

    handle_errors {
        rewrite * /{http.error.status_code}.html
        file_server
    }

    log {
        output file /var/log/caddy/caddy.log
    }
}
```
