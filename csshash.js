const fs = require('fs')
const { nanoid } = require('nanoid')

const hash = nanoid();

const DATAFILE =  '_data/csshash.json';
const MINIFIED_CSSFILE = `index.${hash}.min.css`

var jsonValue = `{
  "indexCSS": "${MINIFIED_CSSFILE}"
}`
fs.writeFileSync(DATAFILE, jsonValue)
