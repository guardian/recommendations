# Production Services, Ownership and Maintenance

For applications, services and tools that we run in "production" (whether that is on developer machines, on a server or in the browser) there is a basic set of requirements that are expected to be met. These requirements exist to ensure consistent maintainability, security, observability and resiliency standards across our estate. 

On top of that, every codebase should have ongoing security and upkeep maintenance applied to it. *This may only be lightweight and relatively infrequent when the project is low priority/risk.*

## Baseline requirements for production services and applications

N.B. This guidance only intended as a minimum baseline; in practice the expectation will be much higher for critical projects.

### CI/CD
- All source code should be version controlled using [GitHub](./github.md)
- CI/CD should be employed
    - An appropriate testing strategy should be considered. We do not aim for a specific % of test coverage, but important business logic should be unit tested
    - For CI, use [GitHub Actions](./github-actions.md)
    - For most (non-library) projects, deployment will be done via [Riff-Raff](https://riffraff.gutools.co.uk/)

### Security
- A basic [security](./security.md) assessment should be performed to understand the risks and available controls. E.g. 
authentication, network security, encryption, secret management. Expert guidance from outside the team should sought for high risk applications (e.g. processing user data)
- Any dependency manifest files should be scanned using [Dependabot](https://docs.github.com/en/code-security/dependabot/dependabot-alerts)
- Internal tools should be behind Google Authentication 
    - A helper exists for [Scala](https://github.com/guardian/play-googleauth) and authentication can be added to an [ALB directly](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/listener-authenticate-users.html)
    - Network-layer restrictions may also be recommended based on the context
- All new 3rd party software / vendors used as part of a service should have approval via the [official process](https://spike.gnmremote.com/content/178/requesting-software-for-your-gnm)

### Infrastructure
- AWS infrastructure should *not* be deployed to the Developer Playground account. *This is for data security/privacy and cost/scale reasons. We also periodically purge infrastructure from that account.*
- All new AWS infrastructure should be defined using [CDK](https://github.com/guardian/cdk), and legacy services should be migrated when possible
- Infrastructure costs should be estimated and within existing budget (unless otherwise approved by Head/Director of Engineering)

### Observability and support
- Monitoring and alerting should exist to ensure the owner is notified when the core functionality of a service is unavailable or impaired
- Application logs and (if necessary/applicable) telemetry data should be [shipped](https://github.com/guardian/deploy-tools-platform/tree/main/elk), so that service impairment can be debugged effectively for common problems (e.g. application errors, resource constraints)
- For high priority applications, a runbook should be created to describe to other engineers how to debug and address service impairment incidents ([example](https://docs.google.com/document/d/1Mz0cp0Ktq1IaOoVd-kqWF_VK25g9E6QQXiiXCTqbXno/edit#heading=h.y64rwxfd5dwk))

## High level maintenance expectations

The broad expectations of ongoing maintenance of a production application are:
1. Security vulnerabilities are [addressed](/security.md#vulnerability-management) *as a priority*
1. Dependencies are [kept up to date](https://github.com/guardian/security-recommendations/blob/main/recommendations/vulnerability-management.md#vulnerabilities-via-3rd-party-libraries), so that security patching requirements can be met efficiently
1. Unused functionality is removed
1. Impaired functionality is addressed, with priority determined by its importance
1. Costs are monitored. [Baseline monitoring](https://github.com/guardian/aws-cost-management) is added globally
1. Architecture/design is reviewed periodically to ensure adherence to best practices and any SLA/SLOs at the team or org level

### Orphaned Projects
In the vast majority of cases we address these by assigning [ownership](./github.md#collaborators-and-codeowners) of source code to an official engineering team. Official engineering teams have useful properties for this task, like resourcing oversight and planning ceremonies.

There are some repositories (containing production software) we have created that have no clear official engineering team owner. In this case we expect a small group of volunteers to be responsible for the above maintenance tasks. We expect these volunteers to:
- Create a GitHub team and add volunteers as team members. Notify the Developer Experience team of this (the team should be admins of all relevant GitHub repos)
- Create a Google group / email address
- Find replacements for any leavers (can be delegated to their line manager if needed)
- Create a lightweight process for regular maintenance work (e.g. a recurring meeting)

Each of these teams should include an Engineering Manager who will be able to help manage permissions and resourcing.
