var webpack = require("webpack");
var CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  entry: './src/scripts/index.ts', 
  output: {
    filename: './dist/scripts/bundle.js',
    path: __dirname
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },

  devtool: 'inline-source-map',
  resolve: {
    extensions: ["*", ".tsx", ".ts", ".js"]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new CopyWebpackPlugin([{
      from: 'src/index.html', to:'dist'
    }])
  ]
};