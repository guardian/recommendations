# GitHub

## User Configuration
> **Note**
> These are also checked by [gu-who](https://github.com/guardian/gu-who#enforced-requirements).

- [MFA](https://help.github.com/articles/about-two-factor-authentication) must be enabled
- A human name should be added to your account

These requirements are intended to make it easier to manage user accounts and understand if they should be in the organisation or not.

## Creating a new repository

The recommended method for spawning a new repository is using https://repo.new/ (which redirects to https://github.com/new/).

![image](https://github.com/guardian/recommendations/assets/52038/3acc15cf-0465-4133-9a18-0d4cb6eca754)

Bear in mind:

* The repository Owner should be `guardian`
* The best visibility for most repositories is `Public`, rather than `Internal` or `Private`.
  [Developing in the Open](https://www.theguardian.com/info/developer-blog/2014/nov/28/developing-in-the-open) makes better software!
* Make sure you grant an appropriate focussed [GitHub team](https://github.com/orgs/guardian/teams) full
  [`Admin` access to the repo](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/managing-teams-and-people-with-access-to-your-repository#filtering-the-list-of-teams-and-people) - this should be the dev team that will be owning this project, not a huge team with hundreds of members!
* For public repositories, we recommend using the Apache v2 license.

We're no longer using https://repo-genesis.herokuapp.com/, as there are many different aspects to setting a GitHub repo up in the best possible
way, and repo-genesis only enforced a couple of them, and only at the point of creation. DevX have plans to enable a new repo-monitoring
service which will ensure many more aspects of Guardian repos are checked and adhere to [best practices](https://github.com/guardian/recommendations/blob/main/best-practices.md#github).


## Repository Configuration
### Visibility
The default should be `Public`.

In some cases it may be necessary to have a more restrictive visibility. Think carefully about the justification for making a repository non-public and make sure this justification is clear to the whole team.

If you need a non-public repository, the best visibility to choose is [`Internal`](https://docs.github.com/en/enterprise-cloud@latest/repositories/creating-and-managing-repositories/about-repositories#about-internal-repositories). This makes the repository readable (but not writable) by all Guardian GitHub organisation members. (Typically you should also grant write access via the [`@guardian/guardian-developers-write`][gh-write] team: see [Access](#access) below.)

You can make a repository `Private` if you do not want it to be visible to the entire organisation. This should only be done in exceptional circumstances and your team should be clear about the justification.

### Default branch name
Use `main`.

Words matter. See docs from the [`master-to-main` tool][master-to-main] for more information. This tool can also be used to rename the default branch.

### Branch Protection
Enable branch protection for the default branch.

Particularly when [continuous delivery] is configured, branch protection reduces risk as it means changes get reviewed before being deployed.  The following settings are recommended:
- Require pull request reviews before merging
- Require review from Code Owners (see [Codeowners](#codeowners))
- Require status checks to pass before merging
- Require branches to be up to date before merging
- Include administrators

If you need to disable branch protection, e.g. in order to use the [Scala release workflow](https://github.com/guardian/gha-scala-library-release-workflow), you should [re-enable protection via rulesets](github-rulesets.md), which allow for protection to be bypassed in certain specific cases.

### Access
Access should be granted to [GitHub teams][gh-teams]. Avoid individual access.

Should an individual leave the GitHub organisation, they'll automatically lose access to all repositories when access is granted via teams.
When individual access is granted, they'll retain access to a repository until manually removed.

Generally, new repositories should be open to the department via `Internal` visibility (for read access) and by granting write access to the [`@guardian/guardian-developers-write`][gh-write] team.

(Existing `Private` repositories may achieve the same effect by additionally granting read access to [`@guardian/guardian-developers-read`][gh-read]. This approach is not recommended since GitHub's introduction of `Internal` visibility.)

### Collaborators and CODEOWNERS
Include at least one GitHub team as a collaborator with admin access. *At an organisational level, this identifies owners for every repository, so that we can better ensure security and maintenance work is under the remit of a team for all our (production) code.*

In general, avoid giving individual access to repositories and prefer teams.

Include a [`CODEOWNERS`][gh-codeowners] file which references the [GitHub team(s)][gh-teams] responsible for different parts of the repository. *This allows the responsible team to receive notifications of contributions and review changes.*




### Archiving
Repositories that are no longer used should be [archived][gh-archived].

### Environments
[GitHub environments][gh-environments] can be configured with protection rules and secrets. Workflows that reference an environment will then be bound by its protection rules and, if allowed, get access to it's secrets. When configuring workflows that require secrets, consider whether an environment can be used in conjunction with the [branch protection rules](#branch-protection) to limit the use of the secret.

For example, when configuring [auto-publishing for an npm library][npm-publishing] it is recommended that you create a new environment for this purpose, containing the NPM and GitHub tokens and with the protection rules set so that it can only be used from the release branch. The release workflow should then reference this environment.

### Topics
[Topics][gh-topics] must be used to categorise repositories that are, or are not, destined for production. These topics make it clear to others what the purpose of the repository is and allow projects to be filtered out of monitoring and searches where required. More than one topic can be added, and if both `production` and a non-production topic are combined, a repository will be assumed to contain production code.

| Topic         | Description                                                        |
| ------------- | ------------------------------------------------------------------ |
| prototype     | Repositories that are used to prove a new concept                  |
| learning      | Repositories that have been created as part of a learning exercise |
| hackday       | Repositories that are created during hack days                     |
| testing       | Repositories that are used for test purposes                       |
| documentation | Repositories that contain only documentation and no source code    |
| production    | Repositories that are deployed to production                       |
| interactive   | Repositories that are owned by the interactives/visuals teams      |

If none of the above topics fit your need, a PR should be opened to add the new topic to this list before use. 

## Repository contents
- Never commit secret information. See also the [security recommendations].
- Avoid private information in public repositories

### Public information
Things we could happily put on the front page of the Guardian.

Examples:
  - source code
  - diagrams
  - [architecture decision records](architecture-decision-records.md)

### Private information
Things we do not want to be common knowledge, but knowing them does not directly compromise anything.

Generally this means that knowing that detail would make an exploit (technical or people-wise) easier to achieve, especially when combining a few of them.

Not for public repositories. Fine for private repositories.

Examples:
  - AWS account IDs
  - S3 bucket names

### Secret information
Information that directly causes problems! These should be kept out of VCS completely.

Secrets should be rotated regularly.

If leaked, it is a security incident and the [incident doc] should be followed.

Examples:
  - API keys
  - Passwords
  - Authentication tokens


<!-- only links below here -->

[master-to-main]: https://github.com/guardian/master-to-main/blob/main/migrating.md
[gh-archived]: https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/archiving-a-github-repository/archiving-repositories
[gh-codeowners]: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners
[gh-environments]: https://docs.github.com/en/actions/reference/environments
[gh-topics]: https://docs.github.com/en/github/administering-a-repository/managing-repository-settings/classifying-your-repository-with-topics
[npm-publishing]: ./npm-packages.md#continuous-delivery
[incident doc]: https://docs.google.com/document/d/1HQxblYg0nh48UJlmh_qlWHfXB5EYJRStcKvoWAqyM_Y/edit#
[gh-teams]: https://github.com/orgs/guardian/teams
[gh-read]: https://github.com/orgs/guardian/teams/guardian-developers-read
[gh-write]: https://github.com/orgs/guardian/teams/guardian-developers-write
[continuous delivery]: ./continuous-deployment.md
[security recommendations]: ./security.md
