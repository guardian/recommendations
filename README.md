# Principles

**Design for failures** all things break, so the behaviour of a system when any of its components, collaborators or hosting infrastructure fail or respond slowly must be a key part of its design

**Design for fast feedback** feedback from real users, in production, is a key ingredient to making a great product. Make use of opt-in betas, feature switches etc. to get feedback before a feature is ‘ready’

**Design for simplicity** great designs model complex problems as simple discrete components

**Software and infrastructure are not separate concerns** the simplest, most reliable solutions often require changes to both, so a team must be responsible for both and should be designed together

**Buy when non-core** only build things when we are really good at it and it makes a significant difference to the Guardian

**Design to be monitored** statistics measuring what the product is trying to achieve should be monitored

**Design for horizontal scaling** a system that can be scaled by adding additional servers
provides simpler scalability and greater robustness

**Single responsibility applications** monitoring, self-healing and graceful degradation are simpler when responsibilities are not conflated. This should be balanced with the complexity cost of many different applications.

**Services with published interfaces** applications owned by a team should form a coherent service with explicit, documented interfaces for use by other services

**Scaling state is complex** avoid state where possible and where it is unavoidable, have a clear plan for how it can scale including consistency, availability and partition tolerance (CAP) considerations, or why scaling is unnecessary

**Prefer communication via idempotent events** idempotent events allow us to replay in the event of failure and use at-least-once semantics

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
-   [Containers](containers.md)
