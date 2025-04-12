const clear = require('rollup-plugin-clear');

/**
 * @type {import('rollup').RollupOptions}
 */
module.exports = {
  input: 'src/index.js',
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
  ],
};
