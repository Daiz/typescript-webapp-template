const {
  CheckerPlugin
} = require("awesome-typescript-loader");
const {
  resolve,
  join,
  basename,
  dirname
} = require("path");
const pkg = require("./package.json");

const HOST = process.env.npm_package_config_host || pkg.config.host;
const PORT = process.env.npm_package_config_port || pkg.config.port;
const MAIN = pkg.main;
const FILENAME = basename(MAIN);
const PATH = dirname(MAIN);

module.exports = {
  entry: {
    loader: "./src/index.ts"
  },

  output: {
    filename: FILENAME,
    path: join(__dirname, PATH),
    publicPath: "/"
  },

  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
  },

  module: {
    rules: [{
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        exclude: resolve(__dirname, "node_modules"),
        include: resolve(__dirname, "src")
      },
      {
        // Babel is used with webpack-dev-server
        // to make it function on iOS 9/10
        test: /\.js$/,
        include: /webpack-dev-server/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"]
          }
        }
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.css$/,
        use: [{
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
        ]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: [{
          loader: "url-loader",
          options: {
            limit: 100000
          }
        }]
      }
    ]
  },

  plugins: [new CheckerPlugin()],

  devServer: {
    host: HOST,
    port: PORT,
    historyApiFallback: true
  }
};
