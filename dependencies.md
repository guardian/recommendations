# Dependencies

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

## JavaScript

Dependencies in JavaScript can be either imported directly from a URL,
or managed with Node and a build system based on `package.json` declaration.

When using a package manager, use a lock file to prevent prevent mismatches in transitive
dependencies between environments.

Ensure that all dependencies in deployed applications are pinned to a `patch` version.
This provides more [consistency and safety between the `package.json` file and the lock file](https://docs.renovatebot.com/dependency-pinning/#what-a-lock-file-doesnt-do-for-you).

```JSONC
{
    "dependencies": {
        // ✅ Good
        "@guardian/package": "18.2.1",

        // ❌ bad
        "@guardian/package": "^18.2.1",
        "@guardian/package": "~18.2.1",
    }
}
```

When developing libraries to be published as NPM packages,
[use ranges for peer dependencies](./npm-packages.md#peerDependencies).
