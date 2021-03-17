#!/usr/bin/env node
import findDependency from 'find-dependency'
import exec from '@cush/exec'
import sade from 'sade'
import path from 'path'

const uvuPath = findDependency('uvu')!
if (!uvuPath) {
  const { red } = require('kleur')
  console.error(red('[!]'), '"uvu" must be installed')
  process.exit(1)
}

const { version } = require(path.join(uvuPath, 'package.json'))

async function uvu(watch?: boolean) {
  let cmd = path.join(uvuPath, 'bin.js')
  let argv = process.argv.slice(2)
  if (watch) {
    argv = argv.filter(arg => arg !== '-w' && arg !== '--watch')
    process.stdout.write('\x1B[2J\x1B[3J\x1B[H\x1Bc')
  }
  try {
    await exec.async(cmd, argv, { stdio: 'inherit' })
  } catch {}
}

sade('uvu [dir] [pattern]')
  .version(version)
  .option('-w, --watch', 'Rerun tests on file changes')
  .option('-b, --bail', 'Exit on first failure')
  .option('-i, --ignore', 'Any file patterns to ignore')
  .option('-r, --require', 'Additional module(s) to preload')
  .option('-C, --cwd', 'The current directory to resolve from', '.')
  .option('-c, --color', 'Print colorized output', true)
  .action(async (_dir, _pattern, opts) => {
    let running = uvu(opts.watch)

    if (opts.watch) {
      const { filespy } = require('filespy')
      const { debounce } = require('mini-debounce')

      const cwd = opts.cwd || process.cwd()
      const spy = filespy(cwd, {
        skip: ['.*', 'node_modules'].concat(opts.ignore || []),
      })

      // Ignore initial crawl events.
      spy.on('ready', () => {
        let queued = false
        spy.on('all', debounce(queueRun, 100))

        function queueRun() {
          if (queued) return
          queued = true
          running = running.then(() => {
            queued = false
            return uvu(true)
          })
        }
      })

      // Ignore permission errors, but crash on others.
      spy.on('error', err => {
        if (err.code !== 'EACCES') {
          process.emit('uncaughtException', err)
        }
      })
    }
  })
  .parse(process.argv)

// Provide types for `require` calls
declare global {
  interface NodeRequire {
    (m: 'kleur'): typeof import('kleur')
    (m: 'filespy'): typeof import('filespy')
    (m: 'mini-debounce'): typeof import('mini-debounce')
  }
}
