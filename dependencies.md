> TODO: add general info about dependencies in other environments / languages.

# NPM Dependencies

- Semver intro + link

- Reducing bundle size w/ peer deps
- Consideration around @dependabot 
    - package.json for humans / yarn.lock for machines
- Info about caret & tilde notations
- 

We recommend using caret notation to target the latest minor and patch versions.

## Known non-semver packages

- aws cdk

# Peer and Development dependencies

### `devDependencies`

### `peerDependencies`

Assuming the package you depend on follows SemVer, prefer using the caret (^)
style for `peerDependencies` and specify the lowest acceptable minor version. If
any minor version of a given major version is okay, then this can be as simple
as `^3`, for example.

Any `peerDependencies` you specify should be duplicated in `devDependencies` in
order to be able to run tests locally or in CI.

In some cases your package might work across multiple major versions of a peer
dependency. In this case you can use the `||` notation. For example if your
package works with TypeScript 3 or 4 you could write: `^3 || ^4`.
