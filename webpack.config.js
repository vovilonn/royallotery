const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './js/crypto.js',
  output: {
    filename: 'crypto.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    // Work around for Buffer is undefined:
    // https://github.com/webpack/changelog-v5/issues/10
    new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.ProvidePlugin({
        process: 'process/browser',
    }),]
};