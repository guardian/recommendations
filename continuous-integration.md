# Continuous Integration

**Our vision: At the Guardian, we have a consistent and transparent method of maintaining continuous integration and deployment, with all non-private configuration stored under version control.**
                                                                                              
Currently, we primarily use TeamCity for continuous integration, with some teams migrating certain applications to GitHub Actions.

At the moment, we have around 10 different places to maintain continuous integration actions at the Guardian - see the [research document](https://docs.google.com/document/d/1ZshliBZMYogwbSMZv8xgghohn0KGjPxCfBmXj75xL8k/edit#) for more information. 
To simplify and ease the process of managing continuous integration at the Guardian, we [propose](https://docs.google.com/document/d/1O5QbX-p9ujZyx9QcnmQ4yIiEv0XvsdztzXMwG5UPU6M/edit?ts=5ffdaadf) to have it set up like so:

## CI configuration within the repository
 - A single file for configuring CI steps (such as a GitHub Action file in .github/workflows, or [TeamCity configuration as code](https://blog.jetbrains.com/teamcity/2019/03/configuration-as-code-part-1-getting-started-with-kotlin-dsl/))
 - A single bash script containing CI steps, ideally located in `script/ci` and following GitHub's [Scripts To Rule Them All pattern](https://github.com/github/scripts-to-rule-them-all) 
 
## Required CI configuration, actions and behaviours outside the repository

You should only need to navigate outside the repository for one-off actions, such as:
 - Deploying your version of an app to an environment (eg deploying a branch to CODE)
 - Creating CloudFormation stacks and viewing deploy histories 
 
 Ideally, you would only need to go one or two UIs for all of these behaviours, and custom services and tooling would be in place to handle these behaviours with ease and efficiency.

To achieve this, we can provision AWS accounts with appropriate configuration and sensible defaults, allowing developers to write minimal CI configuration in order to get their changes tested, built and deployed to their infrastructure.
