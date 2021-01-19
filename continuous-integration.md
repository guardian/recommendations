Continuous Integration
---

**[Our vision](https://docs.google.com/document/d/1O5QbX-p9ujZyx9QcnmQ4yIiEv0XvsdztzXMwG5UPU6M/edit?ts=5ffdaadf): At the Guardian, we have a consistent and transparent method of maintaining continuous integration and deployment, with all non-private configuration stored under version control.**
                                                                                              
Currently, we primarily use TeamCity for continuous integration, with some teams migrating certain applications to GitHub Actions.

At the moment, we have around 10 different places to maintain continuous integration actions at the Guardian - see the [research document](https://docs.google.com/document/d/1ZshliBZMYogwbSMZv8xgghohn0KGjPxCfBmXj75xL8k/edit#) for more information. 
To simplify and ease the process of managing continuous integration at the Guardian, we [propose](https://docs.google.com/document/d/1O5QbX-p9ujZyx9QcnmQ4yIiEv0XvsdztzXMwG5UPU6M/edit?ts=5ffdaadf) to have it set up like so:

## CI configuration within the repository
 - A single file for configuring CI steps (such as a GitHub Action file in .github/workflows, or [TeamCity configuration as code](https://blog.jetbrains.com/teamcity/2019/03/configuration-as-code-part-1-getting-started-with-kotlin-dsl/))
 - A single bash script to run CI commands, ideally `script/ci`, following GitHub's [Scripts To Rule Them All pattern](https://github.com/github/scripts-to-rule-them-all)
    - This script can call multiple sub-scripts to avoid `script/ci` becoming excessively lengthy
 
## Required CI configuration, actions and behaviours outside the repository

At the moment, you will need to navigate to TeamCity's UI to set up and configure your application.
In the future, we will aim for continuous integration to be automatically generated for applications, with GitHub Actions already making this possible by adding a `.github/workflows` file.

We can provision AWS accounts with appropriate configuration and sensible defaults, allowing developers to write minimal configuration in order to get their changes tested, built and deployed to their infrastructure.
