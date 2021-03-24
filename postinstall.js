const path = require('path')
const fs = require('fs')

if (process.cwd().includes('uvu-watch')) {
  process.chdir('../..')
}

mkdirp('node_modules/.bin')
fs.symlinkSync(
  '../uvu-watch/dist/uvu-watch.js',
  'node_modules/.bin/uvu'
)

function mkdirp(dir) {
  if (!fs.existsSync(dir)) {
    mkdirp(path.dirname(dir))
    fs.mkdirSync(dir)
  }
}
