[Scripts To Rule Them All pattern]: https://github.com/github/scripts-to-rule-them-all
[GitHub Actions]: https://docs.github.com/en/actions
[RiffRaff]: https://github.com/guardian/riff-raff
[`node-riffraff-artifact`]: https://www.npmjs.com/package/@guardian/node-riffraff-artifact
[`sbt-riffraff-artifact`]: https://github.com/guardian/sbt-riffraff-artifact

Continuous Integration
======================

[Continuous Integration (CI)](https://www.martinfowler.com/articles/continuousIntegration.html) is a practice where developers frequently integrate their work, usually each person integrates at least daily, leading to multiple integrations per day. Each integration is verified by an automated build and checks run on each check-in, allowing teams to detect problems early.

## Tasks

You should have continuous integration set up in your repository running the following tasks where relevant:
* Linting your codebase
* Running unit and integration tests
* Building your application
* Publishing artifacts
* Other appropriate tasks for your repository

## Keeping the process fast

The purpose of CI is to have rapid feedback and as such you should favour `speedness` over `correctness` and direct  `costs`.    
Quoting `Martin Folwer`:  

> For most projects, however, the XP guideline of a ten minute build is perfectly within reason. Most of our modern projects achieve this. It's worth putting in concentrated effort to make it happen, because every minute you reduce off the build time is a minute saved for each developer every time they commit. Since CI demands frequent commits, this adds up to a lot of time.

In a news organisation having a minimal time to recovery can be important due to the unpredictability of the news agenda, and the importance of timing.
Every minute you reduce your building time is a minute saved when you will need to fix an issue on `PROD` at a critical moment. 


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
