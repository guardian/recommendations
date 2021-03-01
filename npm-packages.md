# Publishing and using `@guardian` NPM packages

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Using

-   Make sure you include any `@guardian` packages for transpilation in your build process
    -   e.g. your [`webpack.config.js`](https://github.com/webpack/webpack/issues/2031#issuecomment-219040479) might including something that looks like this:

```js
module: {
	rules: [
		{
			test: /\.m?(j|t)sx?$/,
			use: {
				loader: 'babel-loader',
			},
			exclude: {
				test: /node_modules/,

				// don't exclude '@guardian' node_modules
				exclude: /@guardian\//,
			},
		},
	]
}
```

## Publishing

### Use `@guardian`

-   Publish to NPM using the [`@guardian`](https://www.npmjs.com/org/guardian) scope

### Package content

-   Publish packages in ES2020 JavaScript
    -   For TypeScript projects, see `target` in the [compiler options](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
-   Do not ship or depend on polyfills

#### TypeScript

-   Create and include [declaration files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html) if your project uses TypeScript
-   Do not publish `.ts`/`.tsx` files
    -   They depend on a project-specific TypeScript config, and your config may not be the same the project that installs your package
