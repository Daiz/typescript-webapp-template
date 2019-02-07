const { CheckerPlugin } = require("awesome-typescript-loader");
const { resolve, join, basename, dirname } = require("path");
const pkg = require("./package.json");

const HOST = process.env.npm_package_config_host || pkg.config.host;
const PORT = process.env.npm_package_config_port || pkg.config.port;
const LIBRARY = process.env.npm_package_config_library || pkg.config.library;
const MAIN = pkg.main;
const FILENAME = basename(MAIN);
const PATH = dirname(MAIN);

module.exports = {
  mode: process.env.WEBPACK_SERVE ? "development" : "production",

  entry: {
    loader: "./src/index.ts"
  },

  output: {
    filename: FILENAME,
    path: join(__dirname, PATH),
    publicPath: "/",
    library: LIBRARY,
    libraryTarget: "var"
  },

  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        exclude: resolve(__dirname, "node_modules"),
        include: resolve(__dirname, "src")
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 100000
            }
          }
        ]
      }
    ]
  },

  plugins: [new CheckerPlugin()],

  serve: {
    host: HOST,
    port: PORT,
    content: [__dirname]
  }
};
