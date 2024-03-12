[Scripts To Rule Them All pattern]: https://github.com/github/scripts-to-rule-them-all
[GitHub Actions]: https://docs.github.com/en/actions
[Github Actions recommendations]: github-actions.md
[RiffRaff]: https://github.com/guardian/riff-raff
[`actions-riff-raff`]:https://github.com/guardian/actions-riff-raff/
[`aws-actions/configure-aws-credentials`]: https://github.com/aws-actions/configure-aws-credentials

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
Quoting `Martin Fowler`:  

> For most projects, however, the XP guideline of a ten minute build is perfectly within reason. Most of our modern projects achieve this. It's worth putting in concentrated effort to make it happen, because every minute you reduce off the build time is a minute saved for each developer every time they commit. Since CI demands frequent commits, this adds up to a lot of time.

In a news organisation having a minimal time to recovery can be important due to the unpredictability of the news agenda, and the importance of timing.
Every minute you reduce your building time is a minute saved when you will need to fix an issue on `PROD` at a critical moment. 


## Platforms

* Use GitHub Actions (with [`aws-actions/configure-aws-credentials`]) to run continuous integration tasks. See also [Github Actions recommendations].
* Where possible, have CI execute a single, centralised script in the repository named `script/ci` 
    - This adheres to GitHub's [Scripts To Rule Them All pattern]

## Publishing artifacts

You should publish artifacts to [RiffRaff]. 
A useful action for doing so is [`actions-riff-raff`]

**See [continuous deployment](continuous-deployment.md)**
