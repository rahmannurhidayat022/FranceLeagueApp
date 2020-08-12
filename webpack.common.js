const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ServiceWorkerWebpackPlugin = require("serviceworker-webpack-plugin");

module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/home.html",
      filename: "home.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/standings.html",
      filename: "standings.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/saved.html",
      filename: "saved.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/nav.html",
      filename: "nav.html",
    }),
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, "src/sw.js"),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "./src/manifest.json",
          to: "./",
          context: "./",
        },
      ],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "./src/asset/images/",
          to: "./images",
          toType: "dir",
        },
      ],
    }),
  ],
};
