/* eslint-env node */
import path from 'path';
import fse from 'fs-extra';
import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy';

const DIR = path.join(__dirname, 'dist');
const IS_DEV = process.env.ROLLUP_WATCH;

fse.emptyDirSync(DIR);

const config = {
  input: path.join(__dirname, 'src/main.js'),
  output: {
    sourcemap: IS_DEV,
    format: 'iife',
    name: 'app',
    file: path.join(DIR, 'bundle.js'),
  },
  plugins: [
    svelte({
      dev: IS_DEV,
      emitCss: false,
      css: css => css.write(path.join(DIR, 'bundle.css')),
    }),
    resolve({
      browser: true,
      dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/'),
    }),
    copy({
      targets: [
        { src: 'public/**/*', dest: DIR },
      ],
    }),
    commonjs(),
  ],
  watch: {
    clearScreen: false,
  },
};

if (IS_DEV) {
  config.plugins.push(
    livereload(DIR),
  );
} else {
  config.plugins.push(
    terser({
      parse: {
        ecma: 5,
      },
      compress: {
        ecma: 5,
        warnings: false,
        comparisons: false,
        inline: 2,
        drop_console: true,
        passes: 3,
      },
      output: {
        ecma: 5,
        comments: false,
        ascii_only: true,
      },
    }),
  );
}

export default config;
