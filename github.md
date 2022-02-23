# GitHub

## Repository Configuration

### Default branch name

Use `main`.

The [`master-to-main` tool][master-to-main] can be used to rename the default branch.

### Branch Protection

Branch protection should be enabled for the default/release branch of a repository, particularly when continuous delivery is configured. The following settings are recommended:

- Require pull request reviews before merging
- Require review from Code Owners (see [Codeowners](#codeowners))
- Require status checks to pass before merging
- Require branches to be up to date before merging
- Include administrators

### Access
- Access should be granted to [GitHub teams][gh-teams]
  - Should an individual leave the GitHub organisation, they'll automatically lose access to any repository in the organisation
- Avoid individual access
  - Should the individual leave the GitHub organisation, they'll retain access until manually removed
- Open the repository to the department
  - [`@guardian/guardian-developers-read`][gh-read] should have read access
  - [`@guardian/guardian-developers-write`][gh-write] should have write access

### Codeowners

Include a [`CODEOWNERS`][gh-codeowners] file which references the GitHub team(s) responsible for the repository.
Where this file is present, enable `Require review from Code Owners`.

### Archiving

Repositories that are no longer used should be [archived][gh-archived].

### Environments

[GitHub environments][gh-environments] can be configured with protection rules and secrets. Workflows that reference an environment will then be bound by its protection rules and, if allowed, get access to it's secrets. When configuring workflows that require secrets, consider whether an environment can be used in conjunction with the [branch protection rules](#branch-protection) to limit the use of the secret.

For example, when configuring [auto-publishing for an npm library][npm-publishing] it is recommended that you create a new environment for this purpose, containing the NPM and GitHub tokens and with the protection rules set so that it can only be used from the release branch. The release workflow should then reference this environment.

### Topics

[Topics][gh-topics] should be used to categorise repositories that are not destined for production. These topics make it clear to others what the purpose of the repository is and allow projects to be filtered out of searches where required.

| Topic      | Description                                                        |
| ---------- | ------------------------------------------------------------------ |
| prototype  | Repositories that are used to prove a new concept                  |
| learning   | Repositories that have been created as part of a learning exercise |
| hackday    | Repositories that are created during hack days                     |
| testing    | Repositories that are used for test purposes                       |
| production | Repositories that are deployed to production                       |

If none of the above topics fit your need, a PR should be opened to add the new topic to this list before use.

## Repository contents

There are three tiers of information, defined below. In short:
  - Never commit secret information
  - Avoid private information in public repositories

### Public
Things we could happily put on the front page of the Guardian.

Examples:
  - source code
  - diagrams
  - architecture decision records

### Private
Things we do not want to be common knowledge, but knowing them does not directly compromise anything.

Generally this means that knowing that detail would make an exploit (technical or people-wise) easier to achieve, especially when combining a few of them.

Not for public repositories. Fine for private repositories.

Examples:
  - AWS account IDs
  - S3 bucket names

### Secret
Information that directly causes problems! These should be kept out of VCS completely.

Secrets should be rotated regularly.

If leaked, it is a security incident and the [incident doc] should be followed.

Examples:
  - API keys
  - Passwords
  - Authentication tokens


<!-- only links below here -->

[master-to-main]: https://github.com/guardian/master-to-main
[gh-archived]: https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/archiving-a-github-repository/archiving-repositories
[gh-codeowners]: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners
[gh-environments]: https://docs.github.com/en/actions/reference/environments
[gh-topics]: https://docs.github.com/en/github/administering-a-repository/managing-repository-settings/classifying-your-repository-with-topics
[npm-publishing]: ./npm-packages.md#continuous-delivery
[incident doc]: https://docs.google.com/document/d/1HQxblYg0nh48UJlmh_qlWHfXB5EYJRStcKvoWAqyM_Y/edit#
[gh-teams]: https://github.com/orgs/guardian/teams
[gh-read]: https://github.com/orgs/guardian/teams/guardian-developers-read
[gh-write]: https://github.com/orgs/guardian/teams/guardian-developers-write
