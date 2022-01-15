import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";

const isProd = process.env.NODE_ENV === 'production';

const plugins = [nodeResolve()]
if (isProd) {
  plugins.push(terser());
}

export default {
  input: './src/assets/js/index.js',
  output: {
    file: './_site/assets/js/bundle.js',
    format: 'iife'
  },
  plugins
};
