import webpack             from 'webpack';
import path                from 'path';
import chalk               from 'chalk';

import BuildNotifierPlugin from 'webpack-build-notifier';
import ProgressBarPlugin   from 'progress-bar-webpack-plugin';
import SemverPlugin        from 'semver-extended-webpack-plugin';

const isProd   = (process.env.ENV === 'production');

const libraryName = 'messenger';

const outputFile  = isProd ? libraryName + '.min.js' : libraryName + '.js';
const outputPath  = path.join(__dirname, 'lib');
const publicPath  = path.join(__dirname, 'examples');

webpackConfig = {
  entry: path.join(__dirname, 'index.js'),
  devtool: 'source-map',
  stats: {
    warnings: false,
    silent: true
  },
  output: {
    path: outputPath,
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {test: /(\.jsx|\.js)$/, loaders: ['babel-loader', 'eslint-loader'], exclude: /(node_modules)/}
    ]
  },
  plugins: [
    new ProgressBarPlugin({
      format: chalk.yellow.bold('Building [:bar] ') + chalk.green.bold(':percent') + chalk.bold(' (:elapsed seconds)'),
      clear: true,
      summary: true
    }),
    new SemverPlugin({
      files: [path.resolve(__dirname, 'package.json')],
      incArgs: ['prerelease','build']
    }),
    new BuildNotifierPlugin({
      title: 'CD Messenger',
      logo: path.resolve(__dirname, 'src/assets/cd-logo.png'),
      suppressSuccess: true
    })
  ]

};

if (isProd) {
  delete webpackConfig.devtool;
}

export default webpackConfig;
