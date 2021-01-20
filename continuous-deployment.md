Continuous Deployment
-----

## Current practices

* Use [RiffRaff](https://github.com/guardian/riffraff) to deploy your application, set up scheduled deploys and configure continuous deployment
    - Set up scheduled deploys, continuous deployment, scheduled deployment and deployment restrictions in the RiffRaff UI
    - Configure your RiffRaff deployment types inside your repository's `riff-raff.yaml` file 

## Our Vision

**Our vision: At the Guardian, we have a consistent and transparent method of maintaining continuous integration and deployment, with all non-private configuration stored under version control.**
 
To simplify and ease the process of managing continuous deployment and delivery at the Guardian, we propose to have it set up like so:

### Continuous deployment and delivery configuration within the repository

 - A single file for describing continuous deployment and delivery to AWS as well as continuous deployment and delivery and AMIgo configuration (such as a `riffraff.yaml`)
 - A single file to describe your infrastructure to be deployed (such as a CDK template)
 
### Required configuration, actions and behaviours outside the repository

You should only need to navigate outside the repository for one-off actions, such as:
 - Deploying your version of an app to an environment (eg deploying a branch to CODE)
 - Creating CloudFormation stacks and viewing deploy histories 
 
Ideally, you would only need to go one or two UIs for all of these behaviours, and custom services and tooling would be in place to handle these behaviours with ease and efficiency.

We can provision AWS accounts with appropriate configuration and sensible defaults, allowing developers to write minimal configuration in order to get their changes tested, built and deployed to their infrastructure.

**See [continuous integration](continuous-integration.md)**
