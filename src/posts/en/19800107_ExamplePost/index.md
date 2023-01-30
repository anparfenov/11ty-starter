---
eleventyExcludeFromCollections: true
title: Ein toller Titel
description: Eine Titel Unterschrift 
date: 1980-01-07
banner: "L1040393.jpeg"
tags:
  - MTB
  - Run
  - Frankreich
  - Schweiz
  - Österreich
  - "1980"
  - Andy
  - Christian
  - Mark
strava:
  - ["Mark - Samstag" ,"https://www.strava.com/activities/7900980052"]
  - ["Mark - Sonntag" ,"https://www.strava.com/activities/7900979339"]
links:
  - ["Ein Link zu google", "https://google.com/"]
  - ["Noch ein Link zu bing", "https://bing.com/"]

layout: layouts/post.njk
---

Dieser Stub zeigt welche Möglichkeiten mit der Markdown Formatierung bestehen. Der Post kann einfach kopiert und angepasst werden. Für eine Veröffentlichung muss die Zeile `eleventyExcludeFromCollections: true` aus der Frontmatter in Zeile zwei gelöscht werden.

# h1 Heading
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading


## Horizontal Rules

---

## Typographic replacements

Enable typographer option to see result.

(c) (C) (r) (R) (tm) (TM) (p) (P) +-


"Smartypants, double quotes" and 'single quotes'


## Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~


## Blockquotes


> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.


## Lists

Unordered

+ Create a list by starting a line with `+`, `-`, or `*`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    * Facilisis in pretium nisl aliquet
    * Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa


1. You can use sequential numbers...
1. ...or keep all the numbers as `1.`

Start numbering with offset:

57. foo
1. bar


## Code

Inline `code`

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code


Block code "fences"

```
Sample text here...
```

Syntax highlighting

``` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```

## Tables

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

Right aligned columns

| Option | Description |
| ------:| -----------:|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |


## Links

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "Some hoover over text!")

Autoconverted link https://github.com/nodeca/pica


## Images

![Ein Bild](media/IMG_20180728_183643.jpeg "Some hoover over text")

## Image grid

{% from "components/image-grid.njk" import imageGrid %}
{{ imageGrid([
 ["2012-08-07 15.10.59.jpeg", "2018-07-27 19.47.28.jpeg"],
 ["IMG_20180728_183643.jpeg", "IMG_20161023_144116.jpeg"],
 ["L1040393.jpeg", "PXL_20210405_072920868.MP.jpeg"]
]) }}

## Komoot Embedding

<iframe src="https://www.komoot.de/tour/942543524/embed?share_token=anXZ2FodWyx4sb9FY1E46cgJvY1xGSsFUGUXcDIie8E2EcyaAj&profile=1" width="100%" height="700" scrolling="no"></iframe>