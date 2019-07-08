const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
module.exports = {
        entry: './src/index.js',
        output: {
          path: path.resolve(__dirname, './public'),
          filename: 'index_bundle.js'
        },
    module: {
        rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
            test: /\.html$/,
            use: [
              {
                loader: "html-loader"
              }
            ]
          }
      ]
    },
    plugins: [
        new HtmlWebPackPlugin({
          template: "./src/index.html",
          filename: "./index.html"
        })
      ]
  };