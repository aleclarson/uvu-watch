#!/usr/bin/env node
import findDependency from 'find-dependency'
import { red, gray } from 'kleur'
import exec from '@cush/exec'
import sade from 'sade'
import path from 'path'

const uvuPath = findDependency('uvu')!
if (!uvuPath) {
  console.error(red('[!]'), '"uvu" must be installed')
  process.exit(1)
}

const { version } = require(path.join(uvuPath, 'package.json'))

async function uvu(watch?: boolean) {
  let cmd = path.join(uvuPath, 'bin.js')
  let argv = process.argv.slice(2)
  if (watch) {
    argv = argv.filter(arg => arg !== '-w' && arg !== '--watch')
    if (!process.env.CI) {
      process.stdout.write('\x1B[2J\x1B[3J\x1B[H\x1Bc')
    }
    console.log(gray('$ uvu ' + argv.join(' ')) + '\n')
  }
  try {
    await exec(cmd, argv, { stdio: 'inherit' })
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
  .action(async (_dir, _pattern, opts) =>
    opts.watch ? require('watch').watch(opts, () => uvu(true)) : uvu()
  )
  .parse(process.argv)

// Provide types for `require` calls
declare global {
  interface NodeRequire {
    (m: 'kleur'): typeof import('kleur')
    (m: 'watch'): typeof import('watch')
  }
}
