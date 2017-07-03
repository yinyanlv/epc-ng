let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

let themes = ['byd', 'sgmw'];
let entryConfig = {};

themes.forEach((item) => {
  entryConfig[item] = path.join(path.join(__dirname, `src/config/${item}/theme/all.scss`));
});

module.exports = {
  entry: entryConfig,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash:8].css',
    publicPath: ''
  },
  module: {
    loaders: [
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'resolve-url-loader']
        })
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].[hash:8].css')
  ]
};
