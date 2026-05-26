# Application Dependencies

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

### Specifying dependencies

Dependencies in JavaScript can be either imported directly from a URL,
or managed with Node and a build system based on `package.json` declaration.

When using a package manager, use a lock file to prevent prevent mismatches in transitive
dependencies between environments.
Ensure that all dependencies in deployed applications are pinned to a `patch` version.
This provides more [consistency and safety between the `package.json` file and the lockfile](https://docs.renovatebot.com/dependency-pinning/#what-a-lock-file-doesnt-do-for-you). Always use
`npm ci`/`yarn install --frozen-lockfile`/`pnpm install --frozen-lockfile` in CI to ensure
that the lock file is respected.


Why not pinning dependencies in applications is dangerous:
- You are more vulnerable to supply chain attacks, as you are probably pulling in the
latest version of a dependency, which may have been compromised. Explicitly
raising a PR (bonus points if you do this using an automated system with a
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

### Package managers

The JavaScript/TypeScript ecosystem is an extremely popular way to distribute
malware, due to its historically lax approach to security. Some practices to
mitigate this risk include:

- Utilise minimumReleaseAge or equivalent configurations, so that new versions
of dependencies have a chance to be vetted. We recommend 48 hours. These are
available in npm, pnpm, and bun.
- Configure [cooldowns](https://github.blog/changelog/2025-07-01-dependabot-supports-configuration-of-a-minimum-package-age/#whats-new)
in Dependabot. This works similarly to minimumReleaseAge above.
- Avoid installing dependencies on the fly, for example by using npx. Its
default behaviour is to install the most recent version, which may be malicious.
- Exercise caution when choosing less popular libraries, malicious releases may
take longer to be noticed.
- Less practical, but worth considering: Disable
[lifecycle scripts](https://docs.npmjs.com/cli/v8/using-npm/scripts#examples)
(i.e preinstall/postinstall) in your projects. They are extremely useful for
developers, but equally useful to hackers. This might break things. This can be
tricky in npm projects, as it’s an all or nothing switch. pnpm’s support for
this is much better, as it’s enabled by default and has granular controls.
