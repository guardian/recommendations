[continuous integration]: continuous-integration.md
[RiffRaff]: https://github.com/guardian/riff-raff

Continuous Deployment
=====================

Continuous Deployment (CD) is a software release process where verified changes to a codebase are deployed immediately and autonomously to a production environment.

You should have continuous deployment set up for your repository, with the following behaviours configured if applicable:
* Automatically deploying changes to the `main` branch to production
* Using an AMIgo AMI and regularly redeploying the application on a schedule
* Restricting deployments if and when required

You should already have [continuous integration] configured in order to set up continuous deployment.
This ensures the deployed code is safe and ready for deployment. 

## Platforms

* Use [RiffRaff] to deploy your application, set up scheduled deploys and configure continuous deployment
    - Set up scheduled deploys, continuous deployment and deployment restrictions in the RiffRaff UI
    - Configure your RiffRaff deployment types inside your repository's `riff-raff.yaml` file 

**See [continuous integration]**
