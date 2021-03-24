const path = require('path')
const fs = require('fs')

if (process.cwd().includes('uvu-watch')) {
  process.chdir('../..')
} else {
  fs.mkdirSync('node_modules')
}

fs.mkdirSync('node_modules/.bin')
fs.symlinkSync(
  '../uvu-watch/dist/uvu-watch.js',
  'node_modules/.bin/uvu'
)
