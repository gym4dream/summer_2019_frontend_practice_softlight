const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  entry: { main: './src/store.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'store.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        }),
      },
    ],
  },
  devServer: {
    stats: 'errors-only',
    contentBase: './dist',
  },
  plugins: [new ExtractTextPlugin({ filename: 'blog.css' })],
};
