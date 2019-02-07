# TypeScript Webapp Template

This is my personal minimal template for getting quickly started with building projects with [TypeScript](https://www.typescriptlang.org/).

It's intended to be used with [Visual Studio Code](https://code.visualstudio.com/) in order to get automatic formatting with [Prettier](https://prettier.io/) on saving. You can configure other editors to do this too, but the repository only includes configuration files for VS Code, since it's what I use myself.

## How to use

1.  Download the repository
2.  Remove the existing git repository (by deleting the `.git` folder) and initialize a new one for your project
3.  Edit relevant fields in `package.json`
4.  Develop away with `npm start`
5.  Build app for production with `npm run build`

## What's included

### [Webpack 4](https://webpack.js.org/) & [Webpack Serve](https://github.com/webpack-contrib/webpack-serve)

Webpack bundles the project, naturally. May get replaced with [Parcel](https://parceljs.org/) in the future, but for the time being Webpack enables more useful features.

A live reloading development server is also a must, which is why we also have Webpack Serve. You can also use it to preview your project over local WiFi (useful for testing with eg. real mobile devices). To do this, run `npm set typescript-webapp-template:host 192.168.X.X` (replace `typescript-webapp-template` with the value of `name` in your `package.json`) with the IP pointing to your local WiFi network IP address. Make sure to restart the dev server when changing this. Now you should be able to preview your app from other devices by accessing it via the defined IP.

### [Prettier](https://prettier.io/)

Just focus on the coding and let Prettier take care of the formatting for you. Make sure to use an editor that can run Prettier on file save. VS Code will do it by default with the configuration files in this repository after you install the [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) (which is automatically recommended by VS Code once you open the project)

### [TSLint](https://palantir.github.io/tslint/)

A minimal TSLint configuration with `tslint-language-service` (so you don't need a TSLint plugin in your editor) is included that flags the usage of `==` and `!=` over `===` and `!==` as errors (`triple-equals` rule), except for comparison against `null`. If you want a wider set of TSLint rules to use, consider [`tslint-config-standard`](https://github.com/blakeembrey/tslint-config-standard). To use it, simply change your `tslint.json` to the following:

```javascript
{
  /* your personal tslint config */
  "extends": ["tslint-config-standard", "tslint-config-prettier"]
  /* make sure tslint-config-prettier comes last as it ensures lint rule compatibility with Prettier */
}
```

If you or someone else you work with isn't using VS Code, you can also configure linting to be enforced on pre-commit level. To do this, you should first `npm install lint-staged husky`, then add the following to your `package.json`:

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

## What's _not_ included

### CSS-in-JS

If you want a CSS-in-JS solution, I recommend [TypeStyle](https://typestyle.github.io/). Works great with TypeScript! To get it and its helper libraries, just run `npm install typestyle csx csstips` and you'll be up and running in no time.

### Automatic vendor bundling support

[AutoDllPlugin](https://github.com/asfktz/autodll-webpack-plugin) is a wonderful tool for improving build times and separating dependencies into its own vendor bundle, but the canonic version of the plugin does not support Webpack 4 right now. However, it will be included once support is in.

### External CSS loaders

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

By using external CSS you'll most likely want to remove TypeStyle from the project as well with `npm unistall typestyle`

### History API fallback for development server

This allows you to redirect requests to non-existent resources back to your index file. Primarily useful for webapps that work with "bare" URLs (`[host]/webapp/route/index`) instead of eg. hashbangs (`[host]/#!/webapp/route/index`). To add this functionality, first run `npm install -D koa-connect connect-history-api-fallback` and then add the following into your `webpack.config.js`:

```javascript
// At the top of the file
const convert = require("koa-connect");
const history = require("connect-history-api-fallback");
// in the `serve` section of the config:
{
  serve: {
    add: (app, middleware, options) => {
      // For available options, consult the following:
      // https://github.com/bripkens/connect-history-api-fallback#options
      app.use(
        convert(
          history({
            /* options */
          })
        )
      );
    };
  }
}
```

### React

TBD - for React you'll want React itself, React DOM, types and hot loading

### Routing

Currently the template does not include anything for routing, but I will probably make an opinionated choice at some point after I find a router that's satisfying to work with in TypeScript and fulfills my personal needs. This is primarily intended for React, and any included-by-default router can and should obviously be removed if you decide to go with a framework/library with routing built in (or if you simply don't need routing).

### State Management

TBD - [MobX](https://mobx.js.org/) recommended since it's written in TypeScript & is great

### Testing

TBD - Jest with ts-jest?

## License

[Creative Commons Zero (CC0) 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/)
