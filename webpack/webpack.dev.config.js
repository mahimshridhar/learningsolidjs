const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const apps = ["todo", "calculator", "catchTheDot", "alphabetInvasion"]

const entry = apps.reduce((entryObject, app) => {
  entryObject[app] = `./src/${app}/${app}.jsx`
  return entryObject
}, {})

const htmlFilesToBeEmitted = apps.map((app) => {
  return new HtmlWebpackPlugin({
    filename: `${app}.html`,
    chunks: [app],
    title: app,
    template: "src/page-template.hbs",
    description: "",
    minify: false,
  })
})

module.exports = {
  entry,
  output: {
    filename: "[name].[contenthash].js",
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
      apps,
      inject:false
    }),
    ...htmlFilesToBeEmitted
  ],
};
