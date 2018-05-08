# Webpack & TypeScript Boilerplate

This is my personal lean boilerplate for getting quickly started with Webpack & TypeScript projects.

It's intended to be used with [Visual Studio Code](https://code.visualstudio.com/) in order to get automatic formatting with [Prettier](https://prettier.io/) on saving. You can configure other editors to do this too, but the repository only includes configuration files for VS Code, since it's what I use myself.

## What's included

- [Webpack 4](https://webpack.js.org/)
- [Webpack Serve](https://github.com/webpack-contrib/webpack-serve)
  * With History API fallback (like the webpack-dev-server option)
  * To preview over WiFi, you can use `npm set webpack-typescript-boilerplate:host 192.168.X.X` with the IP pointing to your local WiFi network IP address. Make sure to restart the dev server when changing this, and afterwards you should be able to preview your app from other devices by accessing it via the defined IP.
- [TypeStyle](https://typestyle.github.io/)
  * You'll probably want the `csx` and `csstips` helper modules to go with this too, so they're included by default.


## What's *not* included

### Any external CSS loaders

If you want to use something like eg. Sass, you'll want to `npm install -D node-sass sass-loader css-loader style-loader` and add the following to `webpack.config.js` into the module rules array:

```javascript
{
  test: /\.s?[ca]ss$/,
  use: [{
      loader: "style-loader"
    },
    {
      loader: "css-loader"
    },
    {
      loader: "sass-loader"
    }
  ]
}
```

By using external CSS you'll most likely want to remove TypeStyle from the project as well with `npm unistall typestyle`

### File Embedding

If you want to embed files directly into your bundle as Data URIs, you can `npm install -D url-loader` and add the following to `webpack.config.js` into the module rules array:

```javascript
{
  test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/, // applied to images & fonts
  use: [{
    loader: "url-loader",
    options: {
      limit: 100000 // maximum size in bytes for an asset to get inlined
    }
  }]
}
```

### React

TBD - for React you'll want React itself, React DOM, types and hot loading

### TSLint & Pre-commit linting/formatting

Prettier along with strict mode enabled in `tsconfig.json` are considered to be enough of a linting process in itself by this template, and the automatic Prettier formatting on save in VSCode eliminates the need for Prettier formatting pre-commit. However, if you want, you can always add TSLint and pre-commit linting to the project with `npm install tslint tslint-config-prettier tslint-langauge-service lint-staged husky` and by adding the following into `package.json`:

```json
{
  "scripts": {
    "precommit": "lint-staged",
    "lint": "tslint --type-check --project tsconfig.json \"src/**/*.ts*\""
  },
    "lint-staged": {
    "*.{ts,tsx}": [
      "tslint --fix",
      "prettier --parser typescript --write",
      "git add"
    ]
  }
}
```

## License

[Creative Commons Zero (CC0) 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/)
