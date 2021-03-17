# NPM packages

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Publishing a `@guardian` library as an NPM package

### Authoring

Write your library in [TypeScript](https://www.typescriptlang.org).

### Packaging

Do not include your TypeScript source code in your package. Instead, compile your source to JavaScript and [declaration files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html) and publish those.

> TypeScript depends on a project-specific configuration, and your setup may not be the same the project that installs your package

Do not include or depend on [polyfills](https://developer.mozilla.org/en-US/docs/Glossary/Polyfill). Let projects that install your package decide what they need (see the section on using our packages below).

#### Compiling

Use the TypeScript compiler (`tsc`) to generate the JavaScript and TypeScript [declaration files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html) that you publish.

Generate two versions of your library:

1. ES modules targetting ES2020
2. CommonJS modules targetting ES2018 (Node 10+)

> CommonJS is a non-standard module format used by older versions of Node. These files are useful with [Jest](https://jestjs.io/) or if your library is used on the server, for example. At some point we will probably stop publishing these but currently it adds little overhead and has some value.

##### Example

```js
// tsconfig.json
{
	"compilerOptions": {
		"declaration": true,
		"declarationDir": "dist/types",
		"declarationMap": true,
		"module": "ES2020",
		"outDir": "dist/esm",
		"target": "ES2020"
	},
	"files": ["src/index.ts"]
}
```

Given the above, you could run:

-   `tsc` to generate the default ES modules version and TypeScript declaration files
-   `tsc --module commonjs --target es2018 --outDir dist/cjs` to generate a CommonJS version

This is only an example, there are many ways of configuring this.

### Configuring your package

NPM packages are described in a `package.json` file.

#### NPM scope

Publish under the [`@guardian`](https://www.npmjs.com/org/guardian) scope.

##### Example

```js
// package.json
{
	"name": "@guardian/my-package",
	...
}
```

#### Module references

The ES module version of your library should be referenced by the `module` field.

The CommonJS version should be referenced by the `main` field, and the TypeScript declaration files by the `types` field.

##### Example

```js
// package.json – based on the `tsconfig.json` above
{
	"main": "dist/cjs/index.js",
	"module": "dist/esm/index.js",
	"types": "dist/types/index.d.ts",
	...
}
```

### Publishing

#### Continuous delivery

Use [Semantic Release](https://github.com/semantic-release/semantic-release) in a GitHub action.

If your release branch is protected (a good idea) use [guardian/actions-merge-release-changes-to-protected-branch](https://github.com/guardian/actions-merge-release-changes-to-protected-branch) to commit version bumps.

#### Spontaneous publishing

Publish manually from the command line using [np](https://www.npmjs.com/package/np).

## Using `@guardian` NPM packages

To ensure the Guardian's application bundles are as efficient as possible, packages assume nothing about where they will run.

Applications that install `@guardian` packages should decide what language features they will need to polyfill etc.

Therefore, you need to make sure you include any `@guardian` packages for transpilation in your build process.

##### Example

```js
// webpack.config.js
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
