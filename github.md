# GitHub

## Branch Protection

Branch protection should be enabled for the default/release branch of a repository, particularly when continuous delivery is configured. The following settings are recommended:

- Require pull request reviews before merging
- Require review from Code Owners (see [Codeowners](#codeowners))
- Require status checks to pass before merging
- Require branches to be up to date before merging
- Include administrators

## Codeowners

It is recommended to include a `CODEOWNERS` file which references the GitHub team or teams that are responsible for the repository. Where this file is present, it is also recommended to enable the `Require review from Code Owners` option in branch protection.

## Environments

[GitHub environments](https://docs.github.com/en/actions/reference/environments) can be configured with protection rules and secrets. Workflows that reference an environment will then be bound by its protection rules and, if allowed, get access to it's secrets. When configuring workflows that require secrets, consider whether an environment can be used in conjunction with the [branch protection rules](#branch-protection) to limit the use of the secret.

For example, when configuring [auto-publishing for an npm library](./npm-packages.md#continuous-delivery) it is recommended that you create a new environment for this purpose, containing the NPM and GitHub tokens and with the protection rules set so that it can only be used from the release branch. The release workflow should then reference this environment.
