const path = require('path')

import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const dirname = path.dirname(__dirname)

module.exports = {
  mode: 'production',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        include: path.resolve(dirname, 'src'),
        use: 'babel-loader',
      },
      {
        test: /\.(css)$/,
        include: path.resolve(dirname, 'src'),
        use: ['css-loader'],
      },
    ],
    plugins: [
      new HtmlWebpackPlugin({ template: './src/index.html' }),
      new MiniCssExtractPlugin(),
    ],
  },
}
