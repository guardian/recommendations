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

- Think about pipe notation
- needs to be duplicated in `devDependencies` for CI env (tests)