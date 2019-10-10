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
const PRODUCTION = !process.env.ROLLUP_WATCH;

fse.emptyDirSync(DIR);

export default {
  input: path.join(__dirname, 'src/main.js'),
  output: {
    sourcemap: !PRODUCTION,
    format: 'iife',
    name: 'app',
    file: path.join(DIR, 'bundle.js'),
  },
  plugins: [
    svelte({
      dev: !PRODUCTION,
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
    !PRODUCTION && livereload(DIR),
    PRODUCTION && terser(),
  ]
    .filter(Boolean),
  watch: {
    clearScreen: false,
  },
};
