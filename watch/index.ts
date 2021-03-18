import { debounce } from 'mini-debounce'
import exec from '@cush/exec'

export interface Options {
  cwd?: string
  ignore?: string[]
}

export async function watch(opts: Options, run: () => Promise<void>) {
  // Ensure filespy is installed.
  if (!exists('filespy')) {
    const { yellow } = require('kleur')
    console.log(yellow('[!] Installing filespy for watch mode...'))
    await exec('npm i --no-package-lock', {
      cwd: __dirname,
      stdio: 'inherit',
    })
  }

  let running = run()

  const { filespy } = require('filespy')

  const cwd = opts.cwd || process.cwd()
  const spy = filespy(cwd, {
    skip: ['.*', 'node_modules'].concat(opts.ignore || []),
  })

  // Ignore initial crawl events.
  spy.on('ready', () => {
    let queued = false
    spy.on(
      'all',
      debounce(() => {
        if (queued) return
        queued = true
        running = running.then(() => {
          queued = false
          return run()
        })
      }, 100)
    )
  })

  // Ignore permission errors, but crash on others.
  spy.on('error', err => {
    if (err.code !== 'EACCES') {
      process.emit('uncaughtException', err)
    }
  })

  // This code runs when "test.sh" is executed in CI.
  if (process.env.CI && /\/ms$/.test(process.cwd())) {
    setTimeout(() => exec.sync('touch test/* src/* package.json'), 500)
    setTimeout(() => process.exit(), 1000)
  }
}

function exists(name: string) {
  try {
    return require.resolve(name)
  } catch {}
}

// Provide types for `require` calls
declare global {
  interface NodeRequire {
    (m: 'kleur'): typeof import('kleur')
    (m: 'filespy'): typeof import('filespy')
  }
}
