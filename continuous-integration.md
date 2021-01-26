Continuous Integration
====

Continuous Integration (CI) is a practice where developers frequently push their code into a shared repository. 
Automated builds and checks run on each check-in, allowing teams to detect problems early.

You should have continuous integration set up in your repository running the following tasks where relevant:
* Running unit and integration tests
* Building your application
* Linting your codebase
* Publishing artifacts
* Other appropriate tasks for your repository

## Platforms

* Use TeamCity to run continuous integration tasks
* If possible, have a centralised script in the repository named `scripts/ci`  
    - This adheres to GitHub's [Scripts To Rule Them All pattern](https://github.com/github/scripts-to-rule-them-all)
* For public repositories, you can use [GitHub Actions](https://docs.github.com/en/actions) for some above tasks, but we are yet to develop a safe way of uploading artifacts to RiffRaff through it

## Publishing artifacts

You should publish artifacts to [RiffRaff](https://github.com/guardian/riff-raff). 
Two useful libraries for doing so are:
 
* [`node-riffraff-artifact`](https://www.npmjs.com/package/@guardian/node-riffraff-artifact) for publishing Node project artifacts (such as AWS Lambdas)
* [`sbt-riffraff-artifact`](https://github.com/guardian/sbt-riffraff-artifact) for publishing artifacts from Scala projects

**See [continuous deployment](continuous-deployment.md)**
