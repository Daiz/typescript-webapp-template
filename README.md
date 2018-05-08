# TypeScript Webapp Template

This is my personal lean template for getting quickly started with building front-end webapps using Webpack & TypeScript.

It's intended to be used with [Visual Studio Code](https://code.visualstudio.com/) in order to get automatic formatting with [Prettier](https://prettier.io/) on saving. You can configure other editors to do this too, but the repository only includes configuration files for VS Code, since it's what I use myself.

## How to use

1. Download the repository
2. Remove the existing git repository (by deleting the `.git` folder) and initialize a new one for your project
3. Edit relevant fields in `package.json`
4. Develop away with `npm start`
5. Build app for production with `npm run build`

## What's included

- [Webpack 4](https://webpack.js.org/)
- [Webpack Serve](https://github.com/webpack-contrib/webpack-serve)
  * With History API fallback (like the webpack-dev-server option)
  * To preview over WiFi, you can use `npm set typescript-webapp-template:host 192.168.X.X` with the IP pointing to your local WiFi network IP address. Make sure to restart the dev server when changing this, and afterwards you should be able to preview your app from other devices by accessing it via the defined IP.
- [TypeStyle](https://typestyle.github.io/)
  * You'll probably want the `csx` and `csstips` helper modules to go with this too, so they're included by default.

## What's *not* included

### Automatic vendor bundling support

[AutoDllPlugin](https://github.com/asfktz/autodll-webpack-plugin) is a wonderful tool for improving build times and separating dependencies into its own vendor bundle, but the canonic version of the plugin does not support Webpack 4 right now. However, it will be included once support is in.

### Any external CSS loaders

If you want to use something like eg. [Sass](https://sass-lang.com/), you'll want to `npm install -D node-sass sass-loader css-loader style-loader` and add the following to `webpack.config.js` into the module rules array:

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

### Routing

Currently the template does not include anything for routing, but I will probably make an opinionated choice at some point after I find a router that's satisfying to work with in TypeScript and fulfills my personal needs.

### React

TBD - for React you'll want React itself, React DOM, types and hot loading

### TSLint & Pre-commit linting/formatting

Prettier along with strict mode enabled in `tsconfig.json` are considered to be enough of a linting process in itself by this template, and the automatic Prettier formatting on save in VS Code eliminates the need for Prettier formatting pre-commit. However, if you want, you can always add TSLint and pre-commit linting to the project with `npm install tslint tslint-config-prettier tslint-langauge-service lint-staged husky` and by adding the following into `package.json`:

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
