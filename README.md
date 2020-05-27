# Our base Webpack config

Our base webpack config for Laravel projects. Work in progress!

## Support us

Learn how to create a package like this one, by watching our premium video course:

[![Laravel Package training](https://spatie.be/github/package-training.jpg)](https://laravelpackage.training)

We invest a lot of resources into creating [best in class open source packages](https://spatie.be/open-source). You can support us by [buying one of our paid products](https://spatie.be/open-source/support-us).

We highly appreciate you sending us a postcard from your hometown, mentioning which of our package(s) you are using. You'll find our address on [our contact page](https://spatie.be/about-us). We publish all received postcards on [our virtual postcard wall](https://spatie.be/open-source/postcards).

## What's in the Box?

- Babel with `@babel/preset-env` and `@babel/plugin-syntax-dynamic-import`
- Postcss with `postcss-easy-import`, `tailwindcss` and `postcss-preset-env`
- `.vue` file support, also aliases the `vue` dependency to the full build
- Creates a `mix-manifest.json` file
- Sends system notifications on build
- Disables most of Webpack's stats

## Extending the configuration

Create your own `webpack.config.js`, and pass your configuration options to the main export.

```js
module.exports = require('@spatie/webpack')({
    entry: {
        'js/app': './resources/js/app.js',
        'css/app': './resources/css/app.css',
    },
});
```

## Package versions

You can specify alternative package versions using Yarn's `resolutions` configuration.

```json
"resolutions": {
  "tailwind": "^0.5.0"
},
```

## Colofon

### Contributing

Generally we won't accept any PR requests to Spoon. If you have discovered a bug or have an idea to improve the code, contact us first before you start coding.

### License

Spoon and The Laravel framework are open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)
