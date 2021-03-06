import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import bundleSize from 'rollup-plugin-bundle-size';
import commonjs from 'rollup-plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import includePaths from 'rollup-plugin-includepaths';

const name = `merkleBtree`;

const plugins = [
  babel(),
  globals(),
  builtins(),
  commonjs({
    include: `node_modules/**`
  }),
  includePaths({paths: ['src']}),
  bundleSize()
];

const isProd = process.env.NODE_ENV === `production`;
if (isProd) plugins.push(uglify());

export default {
  entry: `src/index.js`,
  plugins,
  dest: `dist/${name}${isProd ? `.min` : ``}.js`,
  moduleName: name,
  format: `umd`
};
