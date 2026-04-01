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

[Dependabot][] automatically scans the dependencies of your projects and suggest upgrades.

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
This provides more [consistency and safety between the `package.json` file and the lockfile](https://docs.renovatebot.com/dependency-pinning/#what-a-lock-file-doesnt-do-for-you).

Why not pinning dependencies is dangerous:
- You are more vulnerable to supply chain attacks, as you are pulling in the
latestversion of a dependency, which may have been compromised. Explicitly
raising a PR (bonus points you do this using an automated system with a
[cooldown period](https://docs.github.com/en/code-security/reference/supply-chain-security/dependabot-options-reference#cooldown-))
often results in a delay of a few hours to several days, which is usually
enough time for the maintainers, or package manager to detect security
issues. See the [Axios supply chain attack of, March 2026](https://snyk.io/blog/axios-npm-package-compromised-supply-chain-attack-delivers-cross-platform/)
for an example of this.
- Depending on your build and release process, you may get a different version
of the dependency in production than you have in development, which can lead to
unexpected bugs.
- Not all packages follow SemVer, so you may get breaking changes in a minor or
patch release.
- If your lockfile is not in version control, it can be difficult to know which
version of a dependency is running in production

```JSONC
{
    "dependencies": {
        // ✅ good
        "@guardian/package": "18.2.1",

        // ❌ bad
        "@guardian/package": "^18.2.1",
        "@guardian/package": "~18.2.1",
    }
}
```

When developing libraries to be published as NPM packages,
[use ranges for peer dependencies](./npm-packages.md#peerDependencies).
