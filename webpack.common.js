const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ServiceWorkerWebpackPlugin = require("serviceworker-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");

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
          from: "./src/asset/images/",
          to: "./images",
          toType: "dir",
        },
      ],
    }),
    new WebpackPwaManifest({
      name: "France League 1 App",
      short_name: "FL1 APP",
      description: "show matches and standings on runtime | dicoding.com",
      background_color: "#000000",
      theme_color: "#000000",
      display: "standalone",
      crossorigin: "use-credentials",
      inject: true,
      fingerprints: false,
      ios: true,
      icons: [
        {
          src: path.resolve("src/asset/icons/icon-72x72.png"),
          size: "72x72",
          ios: true
        },
        {
          src: path.resolve("src/asset/icons/icon-96x96.png"),
          size: "96x96",
          ios: true
        },
        {
          src: path.resolve("src/asset/icons/icon-128x128.png"),
          size: "128x128",
          ios: true
        },
        {
          src: path.resolve("src/asset/icons/icon-144x144.png"),
          size: "144x144",
          ios: true
        },
        {
          src: path.resolve("src/asset/icons/icon-152x152.png"),
          size: "152x152",
          ios: true
        },
        {
          src: path.resolve("src/asset/icons/icon-192x192.png"),
          size: "192x192",
          ios: true
        },
        {
          src: path.resolve("src/asset/icons/icon-384x384.png"),
          size: "384x384",
          ios: true
        },
        {
          src: path.resolve("src/asset/icons/icon-512x512.png"),
          size: "512x512",
          ios: true
        },
      ]
    })
  ],
};
