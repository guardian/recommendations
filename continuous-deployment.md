Continuous Deployment
-----

## Current approach

                                                                                              
Currently, we use [RiffRaff](https://github.com/guardian/riffraff) for most (if not all) continuous delivery and deployment. 
Libraries such as [node-riffraff-artifact](https://www.npmjs.com/package/@guardian/node-riffraff-artifact) and [sbt-riffraff-artifact](https://github.com/guardian/sbt-riffraff-artifact) can (and should) be used to upload artefacts for RiffRaff to deploy.

Per repository, we have around 10 different places to maintain continuous integration, deployment and delivery at the Guardian - see the [research document](https://docs.google.com/document/d/1ZshliBZMYogwbSMZv8xgghohn0KGjPxCfBmXj75xL8k/edit#) for more information.

## Our Vision

**[Our vision](https://docs.google.com/document/d/1O5QbX-p9ujZyx9QcnmQ4yIiEv0XvsdztzXMwG5UPU6M/edit?ts=5ffdaadf): At the Guardian, we have a consistent and transparent method of maintaining continuous integration and deployment, with all non-private configuration stored under version control.**
 
To simplify and ease the process of managing continuous deployment and delivery at the Guardian, we [propose](https://docs.google.com/document/d/1O5QbX-p9ujZyx9QcnmQ4yIiEv0XvsdztzXMwG5UPU6M/edit?ts=5ffdaadf) to have it set up like so:

## Continuous deployment and delivery configuration within the repository

 - A single file for describing continuous deployment and delivery to AWS as well as continuous deployment and delivery and AMIgo configuration (such as a `riffraff.yaml`)
 - A single file to describe your infrastructure to be deployed (such as a CDK template)
 
## Required configuration, actions and behaviours outside the repository

You should only need to navigate outside the repository for one-off actions, such as:
 - Deploying your version of an app to an environment (eg deploying a branch to CODE)
 - Creating CloudFormation stacks and viewing deploy histories 
 
Ideally, you would only need to go one or two UIs for all of these behaviours, and custom services and tooling would be in place to handle these behaviours with ease and efficiency.

We can provision AWS accounts with appropriate configuration and sensible defaults, allowing developers to write minimal configuration in order to get their changes tested, built and deployed to their infrastructure.

**See [continuous integration](continuous-integration.md)**
