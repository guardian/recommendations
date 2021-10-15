> TODO: add general info about dependencies in other environments / languages.

## JavaScript: NPM Dependencies

Dependencies in JavaScript can be either imported directly from a URL,
or managed with Node and a build system based on `package.json` declaration.

Node package managers like, `yarn` and `npm` use lock files to resolve
dependencies, as it’s common for various packages to depend on a third one.
To prevent duplication in the final package, it is important to specify
acceptable ranges using the _caret_ or _tilde_ notation.

- A leading caret `^1.0.0` accepts any subsequent minor or patch version.
- A leading tilde `~1.1.0` accepts any subsequent patch version.

This is especially important for [published packages](./npm-packages.md).

### Known non-semver packages

There are a few examples of packages which **do not** follow SemVer, and for
which a specific version should be specified:

- [`aws-cdk`][]: minor and patch versions can introduce breaking changes

[`aws-cdk`]: https://www.npmjs.com/package/aws-cdk
## Peer and Development dependencies

### `devDependencies`

Development dependencies can be pinned to a specific version, as they are not
bundled in the final client bundle.

### `peerDependencies`

Assuming the package you depend on follows SemVer, prefer using the caret (`^`)
style for `peerDependencies` and specify the lowest acceptable minor version. If
any minor version of a given major version is okay, then this can be as simple
as `^3`, for example.

Any `peerDependencies` you specify should be duplicated in `devDependencies` in
order to be able to run tests locally or in CI.

In some cases your package might work across multiple major versions of a peer
dependency. In this case you can use the `||` notation. For example if your
package works with TypeScript 3 or 4 you could write: `^3 || ^4`.
