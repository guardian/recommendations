# Continuous Integration

**Our vision: At the Guardian, we have a consistent and transparent method of maintaining continuous integration and deployment, with all non-private configuration stored under version control.**
                                                                                              
Currently, we primarily use TeamCity for continuous integration, with some teams migrating certain applications to GitHub Actions.

At the moment, we have around 10 different places to maintain continuous deployment and delivery actions at the Guardian - see the [research document](https://docs.google.com/document/d/1ZshliBZMYogwbSMZv8xgghohn0KGjPxCfBmXj75xL8k/edit#) for more information. 
To simplify and ease the process of managing continuous deployment and delivery at the Guardian, we [propose](https://docs.google.com/document/d/1O5QbX-p9ujZyx9QcnmQ4yIiEv0XvsdztzXMwG5UPU6M/edit?ts=5ffdaadf) to have it set up like so:

## CI configuration within the repository
 - A file for describing continuous deployment and delivery to AWS as well as continuous deployment and delivery and AMIgo configuration (such as riffraff.yaml)
 - A file to describe your infrastructure (such as a CDK template)
 
## Required configuration, actions and behaviours outside the repository

You should only need to navigate outside the repository for one-off actions, such as:
 - Deploying your version of an app to an environment (eg deploying a branch to CODE)
 - Creating CloudFormation stacks and viewing deploy histories 
 
 Ideally, you would only need to go one or two UIs for all of these behaviours, and custom services and tooling would be in place to handle these behaviours with ease and efficiency.

To achieve this, we can provision AWS accounts with appropriate configuration and sensible defaults, allowing developers to write minimal CI configuration in order to get their changes tested, built and deployed to their infrastructure.
