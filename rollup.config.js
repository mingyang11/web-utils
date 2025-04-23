const clear = require('rollup-plugin-clear');
const typescript = require('rollup-plugin-typescript2');
const terser = require('@rollup/plugin-terser');

/**
 * @type {import('rollup').RollupOptions}
 */
module.exports = {
  input: 'src/index.ts',
  output: [
    {
      file: 'es/index.js',
      format: 'esm',
    },
    {
      file: 'dist/index.js',
      format: 'cjs',
    },
    {
      file: 'lib/index.js',
      format: 'umd',
      name: 'web-utils',
    },
  ],
  plugins: [
    clear({
      targets: ['dist', 'es', 'lib'],
      watch: true,
    }),
    typescript({
      tsconfig: 'tsconfig.json',
      useTsconfigDeclarationDir: true,
    }),
    terser(),
  ],
};
