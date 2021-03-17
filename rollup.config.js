import shebang from 'rollup-plugin-preserve-shebang'
import esbuild from 'rollup-plugin-esbuild'

export default {
  input: 'src/cli.ts',
  external: id => id[0] !== '.',
  plugins: [shebang(), esbuild()],
  output: {
    file: `dist/uvu-watch.js`,
    format: 'cjs',
    sourcemap: true,
  },
}
