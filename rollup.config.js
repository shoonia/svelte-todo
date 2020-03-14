/* eslint-env node */
import { join } from 'path';
import fse from 'fs-extra';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import svelte from 'rollup-plugin-svelte';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy';

const DIST_DIR = join(__dirname, 'dist');
const IS_DEV = !!process.env.ROLLUP_WATCH;

fse.emptyDirSync(DIST_DIR);

export default {
  input: join(__dirname, 'src/main.js'),
  output: {
    sourcemap: false,
    format: 'iife',
    name: 'app',
    file: join(DIST_DIR, 'bundle.js'),
  },
  watch: {
    clearScreen: false,
  },
  plugins: [
    svelte({
      dev: IS_DEV,
      emitCss: false,
      css: css => css.write(join(DIST_DIR, 'bundle.css')),
    }),
    resolve({
      browser: true,
      dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/'),
    }),
    copy({
      targets: [
        {
          src: 'public/**/*',
          dest: DIST_DIR,
        },
      ],
    }),
    commonjs(),
    IS_DEV && livereload(DIST_DIR),
    !IS_DEV && terser({
      ecma: 8,
      module: true,
      toplevel: true,
      parse: {
        ecma: 8,
      },
      compress: {
        ecma: 8,
        warnings: false,
        comparisons: false,
        inline: 2,
        drop_console: true,
        passes: 3,
        unsafe_methods: true,
        module: true,
        toplevel: true,
        pure_getters: true,
        unsafe: true,
        unsafe_math: true,
      },
      output: {
        ecma: 8,
        comments: false,
      },
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(IS_DEV ? 'development' : 'production'),
    }),
  ],
};
