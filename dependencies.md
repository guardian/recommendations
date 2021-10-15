Dependencies
============

The software we develop often depends on standalone packaged libraries.
Managing these dependencies is crucial to delivery: we need processes that yield
consistent results in all environments, whether on a developer’s machine or a
deploys. Most languages have package manager which aim to solve this issue.

## [Semantic Versioning][]

> Given a version number `major`.`minor`.`patch`, increment the:
>
> - `major` version when you make incompatible API changes;
> - `minor` version when you add functionality in a backwards compatible manner;
> - `patch` version when you make backwards compatible bug fixes.
>
> Additional labels for pre-release and build metadata are available as extensions to the `major`.`minor`.`patch` format.

Several tools, such as [Dependabot][] or Snyk, can automatically and regularly
scan the dependencies of your projects and suggest upgrades.

[Semantic Versioning]: https://semver.org/
[Dependabot]: https://github.com/guardian/configs/blob/main/.github/dependabot.yml

## Scala: SBT Dependencies

Dependencies should be pinned to the `minor` version.

See the [Scala-specific recommendations](./scala.md)

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