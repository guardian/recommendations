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

Use [Rollup](https://rollupjs.org/guide/en/) to bundle your code.

- Enable [`preserveModules`](https://rollupjs.org/guide/en/#outputpreservemodules) in the rollup output config to maximise treeshakability
- Use [rollup-plugin-ts](https://www.npmjs.com/package/rollup-plugin-ts) to transpile and generate TypeScript [declaration files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)

Generate two versions of your library:

1. ES modules targetting ES2020
2. CommonJS modules targetting ES2018 (Node 10+)

> CommonJS is a non-standard module format used by older versions of Node. These files are useful with [Jest](https://jestjs.io/) or if your library is used on the server, for example. At some point we will probably stop publishing these but currently it adds little overhead and has some value.

##### Example

```js
// rollup.config.js
import ts from 'rollup-plugin-ts';
import pkg from './package.json';

export default [
	{
		input: 'src/index.ts',
		output: {
			dir: pkg.module.replace('/index.js', ''),
			format: 'es',
			sourcemap: true,
			preserveModules: true,
		},
		plugins: [ts({ tsconfig: './tsconfig.es.json' })],
	},
	{
		input: 'src/index.ts',
		output: {
			dir: pkg.main.replace('/index.js', ''),
			format: 'cjs',
			sourcemap: true,
			preserveModules: true,
		},
		plugins: [ts({ tsconfig: './tsconfig.cjs.json' })],
	},
];

```

This is only an example, there are many ways of configuring this.

### Configuring your package

NPM packages are described in a `package.json` file.
Dependencies should specify [allowed version ranges](./dependencies.md#JavaScript-NPM-Dependencies).

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

The CommonJS version should be referenced by the `main` field. 

`.d.ts` files should be published alongside their JS counterparts or be referenced by the `types` field.

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

### `peerDependencies`

#### `peerDependencies` ranges should be a wide as possible

This ensures compatibility with the maximum number of installations.

#### Pin the lowest possible version of `peerDependencies` in `devDependencies`

This ensures your library is developed against the sparest possible version of its dependencies.

##### Example

```js
// my-lib/package.json
{
	"name": "my-lib",
	"version": "1.0.0",
    "devDependencies": {
        "your-lib": "1.2.3"
    },
    "peerDependencies": {
        "your-lib": "^1.2.3"
    }
}
```

#### Changes to `peerDependencies` ranges are breaking

This is because it could require the consumer to make changes to their project, so would not a drop-in change.

> In an npm module, any peer dep change that removes a previously valid version from being valid is a major/breaking change. Peer deps are part of the public API.

— <cite>[@ljharb](https://github.com/semver/semver/issues/502#issuecomment-466501843)</cite>

##### Example

```js
// my-app/package.json
{
	"name": "my-app",
	"version": "1.0.0",
    "dependencies": {
        "your-lib": "1.2.3",
        "their-lib": "4.5.6" // a peer dependency of `your-lib`
    }
}
```

```js
// your-lib/package.json
{
	"name": "your-lib",
	"version": "1.2.3",
    "devDependencies": {
        "their-lib": "4.5.6"
    },
    "peerDependencies": {
        // if this range starts higher, the version of `their-lib` in
        // `my-app` will need to change too
        "their-lib": "^4.5.6"
    }
}
```

#### Do not use local copies of `peerDependencies` in a monorepo

One of the benefits of a monorepo is that projects can directly consume dependencies that live in the same workspace.

This means they are always up-to-date with the latest versions of their deps, e.g.:

```js
// my-app/package.json
{
	"name": "my-app",
    "dependencies": {
        "my-lib": "workspace:*"
    }
}
```

It is tempting to do the same with `peerDependencies`, e.g.:

```js
// lib-a/package.json
{
	"name": "lib-a",
	"version": "1.2.3"
}
```

```js
// lib-b/package.json
{
	"name": "lib-b",
	"version": "4.5.6",
    "devDependencies": {
        "lib-a": "workspace:*" // resolves to 1.2.3 when published
    },
    "peerDependencies": {
        "lib-a": "workspace:^" // resolves to ^1.2.3 when published
    }
}
```

However, this would mean that for any new version of `lib-a` – even a patch – we will need a new _major_ version of `lib-b` (because changes to `peerDependencies` are breaking – see above).

Therefore, even though it means `lib-b` would no longer be consuming the version of `lib-a` that sits alongside it in the repo, `lib-b` should still consume the earliest version of `lib-a` it can (whether or not that's the workspace version).

##### Example

```js
// lib-a/package.json
{
	"name": "lib-a",
	"version": "1.6.7"
}
```

```js
// lib-b/package.json
{
	"name": "lib-b",
	"version": "4.5.6",
    "devDependencies": {
        "lib-a": "1.2.3" // now comes from NPM, not the workspace
    },
    "peerDependencies": {
        "lib-a": "^1.2.3"
    }
}
```

### Publishing

#### Continuous delivery

Prefer continuous delivery from GitHub using [Changesets](https://github.com/changesets/changesets).

Use the org secret `NPM_TOKEN` to publish to NPM. This will publish the package from our [`guardian-developers`](https://www.npmjs.com/~guardian-developers) NPM account.

> This account is managed under npm@theguardian.com by the devex stream.

#### Spontaneous publishing

If you do not use Changesets, publish manually from the command line using [np](https://www.npmjs.com/package/np).

## Using `@guardian` NPM packages

To ensure the Guardian's application bundles are as efficient as possible, packages should assume nothing about the environment in which their code will run (e.g. which browsers, versions of browsers etc).

Applications that install `@guardian` packages should decide what language features they will need to transpile or polyfill.

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

## Running NPM packages as binaries in CI
Various Node libraries can be run over the CLI using tools like `npx` or `yarn dlx`.

The `npx` and `yarn dlx` tools are not deterministic as they do not work off a lockfile, they will install dependencies
according to the library's `package.json`.
That is if the library depends on `^1.0.0` of a library, `npx` can resolve this to `1.0.0` today and `1.99.0` tomorrow.

To ensure a deterministic and repeatable CI build, it is recommended to directly install a package and use a script to run it.
This will result in entries in your project's lockfile as the library is treated like any other dependency.

### Example
Rather than `npx @guardian/node-riffraff-artifact`, prefer to update `package.json`:

```
{
  "devDependencies": {
    "@guardian/node-riffraff-artifact": "^0.2.1"
  },
  "scripts": {
    "riffraff-upload": "node-riffraff-artifact"
  }
}
```

Then run script `npm run riffraff-upload` in CI.
