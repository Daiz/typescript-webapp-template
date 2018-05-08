# Webpack & Typescript Boilerplate

This is my personal boilerplate for getting quickly started with Webpack & TypeScript projects.

It's intended to be used with [Visual Studio Code](https://code.visualstudio.com/) or another code that supports automatic formatting with [Prettier](https://prettier.io/) on saving.

## What's included

- [Webpack 4](https://webpack.js.org/)
- [Webpack Serve](https://github.com/webpack-contrib/webpack-serve)
- [TypeStyle](https://github.com/typestyle/typestyle)


## What's not included

### Any CSS loaders

If you want to use something like eg. Sass, you'll want to `npm install -D node-sass sass-loader css-loader style-loader` and add the following to `webpack.config.js`:

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
