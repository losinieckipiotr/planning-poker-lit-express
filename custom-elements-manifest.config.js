import { customElementVsCodePlugin } from 'custom-element-vs-code-integration'

export default {
  /** Globs to analyze */
  globs: ['src/frontend/**/*.ts'],
  /** Directory to output CEM to */
  // outdir: 'dist',
  /** Run in dev mode, provides extra logging */
  dev: true,
  /** Run in watch mode, runs on file changes */
  watch: false,
  /** Include third party custom elements manifests */
  dependencies: true,
  /** Output CEM path to `package.json`, defaults to true */
  packagejson: false,
  /** Enable special handling for litelement */
  litelement: true,
  /** Provide custom plugins */
  plugins: [customElementVsCodePlugin({})],
}
