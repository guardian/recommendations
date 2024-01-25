# The Guardian software engineering recommendations

This repository document [principles](#principles), standards and [guidelines](#guidelines).

## Principles

## Security principles

- Service should follow the [principle of least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege) regarding user access and consider the sensitivity of any data or operations the service makes available. For example a service which provides `read-only` data on what's for lunch in the canteen may be accessed by all Guardian staff, but a service that publishes content to our site must be tightly controlled to a known set of users.

- Service should follow a **zero-trust approach**. Service should not rely on the network level (`3`) only to grant privilege or make assumption but rather ensure each request is authenticated at application level (`7`), and may use multiple parameters (location, time, user, authentication method, behaviours) to grant or deny access. 

- Service should employ multiple techniques and have defense in depth: typesafe language, virtual machine, operating system hardening, code reviews, integration tests, safe libraries, code static analysis, vulnerabilities scanning, user input sanitising, browsers built-in restrictions, encryption, audits and pentesting.

- All services should be registered in a service catalog with defined technical owners, state of the service and links to related artefacts.

- All services in `production` should be maintained and kept up to date to latest version in alignment with vulnerabilities management standards and with the aim to **reduce exposure windows to a minimum**.

- Technical debt should be actively managed and reduce in line with risk and business strategy.

## Reliability principles

- Publish services **availability SLA** to **communicate expectations** to users or dependent systems and identify area of improvements.

<!-- alex ignore simple -->
- Design for **simplicity** and **single responsibility**. Great designs model complex problems as simple discrete components. Monitoring, self-healing and graceful degradation are simpler when responsibilities are not conflated.

- **Design for failures**. All things break, so the behaviour of a system when any of its components, collaborators or hosting infrastructure fail or respond slowly must be a key part of its design.

- Ensure applications are **swim-laned** to enable **graceful degradation** and **prevent cascading failure**. Communication via **idempotent events** should be preferred **over remote procedure calls (RPC)** as they allow us to replay events in case of failure. When sending event use **at-least-once semantic** to ensure a message will always be sent even in case of a failure.

- **Software and infrastructure are not separated concerns**. The simplest and most reliable solutions often require changes to both, so a team must be responsible for both and they should be designed together.

- Leverage the vendors's recovery and resilience features in the underlying platforms in preference to implementing custom processes. Vendors SLAs usually provide **higher levels of availability** than could be achieved using our own processes: 
    - For example, prefer using `RDS` rather than hosting databases on our own `AWS` instances. With `RDS`, `AWS` manages patching, backups and replication of data to a standby instance in a different [Availability Zone (AZ)](https://aws.amazon.com/about-aws/global-infrastructure/regions_az/), providing resilience to data centre outages.

    - For example, we use use `BigQuery` which [SLA](https://cloud.google.com/bigquery/sla) details a monthly uptime percentage superior to 99.99%. 

- Out of hours support. Team are responsible for their services but there is additional 24/7 compensated support to deal with unexpected issues.

## Scalability principles

- **Design for horizontal scaling** a system that can be scaled by adding additional servers provides simpler scalability and greater robustness.

- **Scaling state is complex** avoid state where possible and where it is unavoidable, have a clear plan for how it can scale including CAP considerations, or why scaling is unnecessary.

- Service should provide coherent features set with explicit documentation including SLA for use by other services.

## Operational principles

- All services should be using for defined common standards for infrastructure management, deployment, configuration management, logging, and observability.

- Workflow and processes should be **automated** to enable users to **self-serve** based on their needs without unneeded time consuming interactions.

- Deployment of changes, including infrastructure, should be automated, **repeatable**, **auditable** and **continuous**. 

- All services should be monitored to alert on business or technical issue and reduce time to restore service.

- Reducing *time to detect and restore* service (availability to users) should be optimised rather than number of failures (reliability of services). 

## Data principles

- Service should be designed with [data minimisation](https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/principles/data-minimisation/) and [data protection by design and default](https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/accountability-and-governance/data-protection-by-design-and-default) principles.


- Data is classified and protected according to [classification](https://docs.google.com/document/d/1wXsshs7GKzVdQhO57-QR6RZDFV2ZySPeHjqTvxfceZk/edit) and associated standard regarding access, storage and protections. 

- Service should implement data retention policy in accordance with data governance standards.

- Service should ensure compliance with `GDPR`, `PECR`, `CCPA`, and others data privacy regulations when creating or maintaining service through following defined processes (e.g Data Council), by using existing libraries and by integrating with existing capabilities for data ingestion (`Fivetrans`), transformation (`DBT`), storage (`BigQuery`) and orchestration of end users privacy requests ([`Baton`](https://github.com/guardian/baton)).   


## Guidelines

-   [Accessibility](accessibility.md)
-   [Applications](applications.md)
-   [AWS](AWS.md)
-   [AWS Costs](AWS-costs.md)
-   [Client Side](client-side.md)
-   [Coding with empathy](coding-with-empathy.md)
-   [Config](config.md)
-   [Content Delivery Network (CDN)](cdn.md)
-   [Continuous Deployment](continuous-deployment.md)
-   [Continuous Integration](continuous-integration.md)
-   [Domain Names](domain-names.md)
-   [Elasticsearch](elasticsearch.md)
-   [Emotion](emotion.md)
-   [GitHub](github.md)
-   [Logging](logging.md)
-   [NPM packages](npm-packages.md)
-   [Production Services, Ownership and Maintenance](ownership.md)
-   [Pull requests](pull-requests.md)
-   [Resiliency and Robustness](resiliency.md)
-   [Scala](scala.md)
-   [Security](security.md)
-   [Services](services.md)
-   [Thrift](thrift.md)
