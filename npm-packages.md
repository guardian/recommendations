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
import ts from "rollup-plugin-ts";
import pkg from "./package.json";

export default [
	{
		input: "src/index.ts",
		output: {
			dir: pkg.module.replace("/index.js", ""),
			format: "es",
			sourcemap: true,
			preserveModules: true,
		},
		plugins: [ts({ tsconfig: "./tsconfig.es.json" })],
	},
	{
		input: "src/index.ts",
		output: {
			dir: pkg.main.replace("/index.js", ""),
			format: "cjs",
			sourcemap: true,
			preserveModules: true,
		},
		plugins: [ts({ tsconfig: "./tsconfig.cjs.json" })],
	},
];
```

This is only an example, there are many ways of configuring this.

### Configuring your package

NPM packages are described in a [`package.json` file](https://docs.npmjs.com/cli/v9/configuring-npm/package-json).

#### NPM scope

Publish under the [`@guardian`](https://www.npmjs.com/org/guardian) scope.

##### Example

Imagine you're working on a re-usable slideshow widget for Guardian web pages:

```js
// package.json
{
	"name": "@guardian/slideshow",
	...
}
```

#### Module references

The ES module version of your library should be referenced by the `module` field.

The CommonJS version should be referenced by the `main` field.

`.d.ts` files should be published alongside their JS counterparts or be referenced by the `types` field.

##### Example

```js
// package.json
{
	"main": "dist/cjs/index.js", // dist/cjs/index.d.ts is included
	"module": "dist/esm/index.js", // dist/esm/index.d.ts is included
	...
}
```

or

```js
// package.json
{
	"main": "dist/cjs/index.js",
	"module": "dist/esm/index.js",
	"types": "dist/types/index.d.ts",
	...
}
```

### `peerDependencies`

If your library depends on other libraries, list them as `peerDependencies` in your `package.json`.

> `dependencies` are automatically installed alongside your library.
>
> If two libraries require different versions of the same library in their `dependencies`, both versions can end up in the final bundle when consumers build their apps.
>
> This is also true if the consumer uses the same library in their app's `dependencies` too.
>
> Using `peerDependencies` instead allows consumers to control which version of a single instance of the dependency they install, while still making sure everything can find what it needs.

#### `peerDependencies` ranges should be a wide as possible

This ensures compatibility with the maximum number of installations.
Read more about [NPM’s range syntax](https://docs.npmjs.com/cli/v6/using-npm/semver#advanced-range-syntax).

Generally, this means using a leading caret which accepts any subsequent minor or patch version (e.g. `^1.0.1`).
However, there are a few of packages which **do not** follow semantic versioning, and for which narrower ranges should be specified:

- [`aws-cdk`](https://www.npmjs.com/package/aws-cdk): minor and patch versions can introduce breaking changes, use a pinned version
- [`typescript`](https://www.npmjs.com/package/aws-cdk): major and minor versions can introduce breaking changes, use a leading tilde (e.g. `~4.9.5`)

##### Example

Imagine `@guardian/slideshow` uses `_.zipObjectDeep`, which was [added to Lodash in v4.1.0](https://github.com/lodash/lodash/wiki/Changelog#v410):

```js
// package.json
{
	"name": "@guardian/slideshow",
	"version": "1.0.0",
	"peerDependencies": {
		"lodash": "^4.1.0"
	}
}
```

The latest version is v4.17.21, but any version of v4 from v4.1.0 onwards will work fine.

#### Pin the lowest possible version of `peerDependencies` in your package's `devDependencies`

This prevents you accidentally developing against a feature of a dependency that was released _after_ the earliest version in your `peerDependencies` range.

##### Example

```js
// package.json
{
	"name": "@guardian/slideshow",
	"version": "1.0.0",
	"devDependencies": {
		"lodash": "4.1.0"
	},
	"peerDependencies": {
		"lodash": "^4.1.0"
	}
}
```

#### Changes to `peerDependencies` ranges are breaking

This is because it will require the consumer to make changes to their project, so it would not be a drop-in change.

> In an npm module, any peer dep change that removes a previously valid version from being valid is a major/breaking change. Peer deps are part of the public API.

— <cite>[@ljharb](https://github.com/semver/semver/issues/502#issuecomment-466501843)</cite>

##### Example

Here's an application that consumes `@guardian/slideshow`:

```js
// package.json
{
	"name": "new-website",
	"dependencies": {
		"@guardian/slideshow": "^1.0.0",
		"lodash": "^4.1.0" // a peer dependency of @guardian/slideshow@1.0.0
	}
}
```

Now imagine a new version `@guardian/slideshow` adds a feature that uses `_.update`, which was [added to Lodash in v4.6.0](https://github.com/lodash/lodash/wiki/Changelog#v460):

```js
// package.json
{
	"name": "@guardian/slideshow",
	"version": "1.1.0", // minor bump for the new feature
	"devDependencies": {
		"lodash": "4.6.0"
	},
	"peerDependencies": {
		"lodash": "^4.6.0" // the minimum version we need has risen from ^4.1.0
	}
}
```

I update my app to use the new version of `@guardian/slideshow`:

```js
// package.json
{
	"name": "new-website",
	"dependencies": {
		"@guardian/slideshow": "^1.1.0", // new version
		"lodash": "^4.1.0" // I don't change this
	}
}
```

My version of Lodash might not have `_.update`, so my app could break. To fix it, I need to update my version of Lodash to `^4.6.0` as well.

Even though bumping Lodash is only a small change, the fact I could not update `@guardian/slideshow` without making _any_ other changes means it's a breaking change.

`@guardian/slideshow` should have been released at `v2.0.0` instead.

#### Packages should not consume local copies of `peerDependencies` in a monorepo

One of the benefits of a monorepo is that projects can directly consume dependencies that live in the same workspace.

This means they are always up-to-date with the latest versions of their deps.

##### Example

Imagine `new-website` and `@guardian/slideshow` both live in the same monorepo:

```js
// package.json
{
	"name": "new-website",
	"dependencies": {
		"@guardian/slideshow": "workspace:*", // always use the local version
		"lodash": "^4.6.0"
	}
}
```

It is tempting to do the same with `peerDependencies` of packages.

Imagine `@guardian/slideshow` starts using something from `@guardian/libs`, which is also in the monorepo:

```js
// package.json
{
	"name": "@guardian/libs",
	"version": "6.0.0"
}
```

```js
// package.json
{
	"name": "@guardian/slideshow",
	"version": "2.1.0",
	"devDependencies": {
		"@guardian/libs": "workspace:*",
		"lodash": "4.6.0"
	},
	"peerDependencies": {
		"@guardian/libs": "workspace:^", // resolves to "^6.0.0" when published
		"lodash": "^4.6.0"
	}
}
```

The lowest version of the range for `@guardian/libs` in `peerDependencies` needs to be the version that's currently in the repo (since that's the version we're developing/testing against).

Although, for us, `@guardian/slideshow` is using `@guardian/libs` directly and not worrying about the version, if `@guardian/libs` code changes we still need to release a new version so that other consumers can pick up the changes.

The new version means we will also need to update the `peerDependencies` range for `@guardian/slideshow`, to ensure consumers are using a compatible version of `@guardian/libs`.

But because changes to `peerDependencies` are breaking (see above), we will also then need a new _major_ version of `@guardian/slideshow` (even if the original change to `@guardian/libs` was just a patch).

This is obviously not great for consumers of `@guardian/slideshow`!

Therefore it is a bad idea for published packages to consume the local version of any deps that live alongside them in a repo.

They should still specify the widest `peerDependencies` range for a dependency that they can, and pin the lowest possible version in `devDependencies` in development/testing.

Effectively, published packages in a monorepo should act as if they were in their own, isolated repo.

##### Example

Imagine `@guardian/slideshow` uses `ArticleDesign.Gallery` from `@guardian/libs`, which was [added in v5.0.0](https://github.com/guardian/libs/releases/tag/v5.0.0), and [didn't change in v6.0.0](https://github.com/guardian/libs/releases/tag/v6.0.0).

Although `@guardian/libs` is at v6.5.2 in the repo and would work fine, we still won't use it directly:

```js
// package.json
{
	"name": "@guardian/slideshow",
	"version": "2.1.0",
	"devDependencies": {
		"@guardian/libs": "5.0.0",
		"lodash": "4.6.0"
	},
	"peerDependencies": {
		"@guardian/libs": "^5.0.0 || ^6.0.0", // either of these work fine with @guardian/slideshow
		"lodash": "^4.6.0"
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
				loader: "babel-loader",
			},
			exclude: {
				test: /node_modules/,

				// don't exclude '@guardian' node_modules
				exclude: /@guardian\//,
			},
		},
	];
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
