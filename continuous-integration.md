Continuous Integration
====

## Current practices

### Platforms

* Use TeamCity to run continuous integration tasks such as:
    - Running tests
    - Linting your codebase
    - Publishing artifacts to RiffRaff
* If possible, have a centralised script in the repository named `scripts/ci`  
    - This adheres to GitHub's [Scripts To Rule Them All pattern](https://github.com/github/scripts-to-rule-them-all)
* For public repositories, you can use [GitHub Actions](https://docs.github.com/en/actions) for some above tasks, but we are yet to develop a safe way of uploading artifacts to RiffRaff through it

### Publishing artifacts

You should publish artifacts to [RiffRaff](https://github.com/guardian/riff-raff). 
Two useful libraries for doing so are:
 
* [`node-riffraff-artifact`](https://www.npmjs.com/package/@guardian/node-riffraff-artifact) for publishing Node project artifacts (such as AWS Lambdas)
* [`sbt-riffraff-artifact`](https://github.com/guardian/sbt-riffraff-artifact) for publishing artifacts from Scala projects

## Vision

**Our vision: At the Guardian, we have a consistent and transparent method of maintaining continuous integration and deployment, with all non-private configuration stored under version control.**
                     
To simplify and ease the process of managing continuous integration at the Guardian, we propose to have it set up like so:

### CI configuration within the repository

 - A single file for configuring CI steps (such as a GitHub Action file in .github/workflows, or [TeamCity configuration as code](https://blog.jetbrains.com/teamcity/2019/03/configuration-as-code-part-1-getting-started-with-kotlin-dsl/))
 - A single bash script to run CI commands, ideally `script/ci`, following GitHub's [Scripts To Rule Them All pattern](https://github.com/github/scripts-to-rule-them-all)
    - This script can call multiple sub-scripts to avoid `script/ci` becoming excessively lengthy
 
### Required CI configuration, actions and behaviours outside the repository

At the moment, you will need to navigate to TeamCity's UI to set up and configure your application.
In the future, we will aim for continuous integration to be automatically generated for applications, with GitHub Actions already making this possible by adding a `.github/workflows` file.

We can provision AWS accounts with appropriate configuration and sensible defaults, allowing developers to write minimal configuration in order to get their changes tested, built and deployed to their infrastructure.

**See [continuous deployment](continuous-deployment.md)**
