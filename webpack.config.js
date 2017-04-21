const path = require('path');
const _root = path.resolve(__dirname, '..');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}
const helpers = {
  root: root
};

module.exports = {
  watch: true,
  entry: './controller/main.js',
  devtool: 'cheap-module-eval-source-map',

  output: {
    // path: helpers.root('static'),
    // publicPath: 'http://localhost:1337/',
    filename: 'bundle.js'
  },

  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  },
  resolve: {
    extensions: ['.js']
  },

  module: {
    rules: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-0']
        }
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html'
    })
  ]
};