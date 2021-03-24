const path = require('path')
const fs = require('fs')

if (process.cwd().includes('uvu-watch')) {
  process.chdir('../..')
}

mkdirp('node_modules/.bin')
symlink(
  '../uvu-watch/dist/uvu-watch.js',
  'node_modules/.bin/uvu'
)

function mkdirp(dir) {
  if (!fs.existsSync(dir)) {
    mkdirp(path.dirname(dir))
    fs.mkdirSync(dir)
  }
}

function symlink(target, link) {
  if (fs.existsSync(link)) {
    fs.unlinkSync(link)
  }
  fs.symlinkSync(target, link)
}
