const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
console.log("path.join(__dirname, './')", path.join(__dirname, "../dist"));
module.exports = {
  entry: {
    todo: "./src/todo/todo.jsx",
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../", "dist"),
    publicPath: "",
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "../", "dist"),
    },
    port: 9000,
    hot: true,
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.hbs$/,
        use: ["handlebars-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index-template.hbs",
    }),
    new HtmlWebpackPlugin({
      filename: "todo.html",
      chunks: ["todo"],
      title: "Hello world",
      template: "src/page-template.html",
      description: "Hello world",
      minify: false,
    }),
  ],
};
