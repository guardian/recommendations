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

## Archiving

Repositories that are no longer used should be [archived](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/archiving-a-github-repository/archiving-repositories).

## Environments

[GitHub environments](https://docs.github.com/en/actions/reference/environments) can be configured with protection rules and secrets. Workflows that reference an environment will then be bound by its protection rules and, if allowed, get access to it's secrets. When configuring workflows that require secrets, consider whether an environment can be used in conjunction with the [branch protection rules](#branch-protection) to limit the use of the secret.

For example, when configuring [auto-publishing for an npm library](./npm-packages.md#continuous-delivery) it is recommended that you create a new environment for this purpose, containing the NPM and GitHub tokens and with the protection rules set so that it can only be used from the release branch. The release workflow should then reference this environment.

## Topics

[Topics](https://docs.github.com/en/github/administering-a-repository/managing-repository-settings/classifying-your-repository-with-topics) should be used to categorise repositories that are not destined for production. These topics make it clear to others what the purpose of the repository is and allow projects to be filtered out of searches where required.

| Topic      | Description                                                        |
| ---------- | ------------------------------------------------------------------ |
| prototype  | Repositories that are used to prove a new concept                  |
| learning   | Repositories that have been created as part of a learning exercise |
| hackday    | Repositories that are created during hack days                     |
| testing    | Repositories that are used for test purposes                       |
| production | Repositories that are deployed to production                       |

If none of the above topics fit your need, a PR should be opened to add the new topic to this list before use.
