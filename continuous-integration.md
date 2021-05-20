[Scripts To Rule Them All pattern]: https://github.com/github/scripts-to-rule-them-all
[GitHub Actions]: https://docs.github.com/en/actions
[RiffRaff]: https://github.com/guardian/riff-raff
[`node-riffraff-artifact`]: https://www.npmjs.com/package/@guardian/node-riffraff-artifact
[`sbt-riffraff-artifact`]: https://github.com/guardian/sbt-riffraff-artifact

Continuous Integration
======================

Continuous Integration (CI) is a practice where developers frequently push their code into a shared repository. 
Automated builds and checks run on each check-in, allowing teams to detect problems early.

## Tasks

You should have continuous integration set up in your repository running the following tasks where relevant:
* Running unit and integration tests
* Building your application
* Linting your codebase
* Publishing artifacts
* Other appropriate tasks for your repository

## Platforms

* Use TeamCity to run continuous integration tasks
* Where possible, have CI execute a single, centralised script in the repository named `script/ci` 
    - This adheres to GitHub's [Scripts To Rule Them All pattern]
* You can use [GitHub Actions] for most above tasks, however there is not currently a departmental best practice for uploading artifacts to RiffRaff through it.

## Publishing artifacts

You should publish artifacts to [RiffRaff]. 
Two useful libraries for doing so are:
 
* [`node-riffraff-artifact`] for publishing Node project artifacts (such as AWS Lambdas)
* [`sbt-riffraff-artifact`] for publishing artifacts from Scala projects

**See [continuous deployment](continuous-deployment.md)**
