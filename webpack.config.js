const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  optimization: {
    minimize: true,
  },
  target: "webworker",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "bin"),
    libraryTarget: "this",
  },
  module: {
    // Asset modules are modules that allow the use asset files (fonts, icons, etc)
    // without additional configuration or dependencies.
    rules: [
      // asset/source exports the source code of the asset.
      // Usage: e.g., import notFoundPage from "./page_404.html"
      {
        test: /\.(css|txt|html)/,
        type: "asset/source",
      },
      {
        test: /\.(css)$/,
        type: "asset/source",
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      URL: "core-js/web/url",
    }),
  ],
};
