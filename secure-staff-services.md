# Securing staff facing services

## Context 

We have a need to make services securely available to both our editorial and engineering staff. In the past we have relied on IP restricting access to internal IP ranges accessible on premises and via VPN by [AWS Security Groups](https://docs.aws.amazon.com/managedservices/latest/userguide/about-security-groups.html).

Restricting access to IP ranges as a method of protecting our tools was reviewed following the [network incident at the start of 2023](https://www.theguardian.com/media/2022/dec/21/guardian-hit-by-serious-it-incident-believed-to-be-ransomware-attack). 

Sole reliance on IP restriction assumes implicit trust in the network. This is considered less secure than an approach in which one builds trust into users, devices and services by using authentication and authorisation mechanisms. IP restrictions could still be considered as additional layer of control.

In order to improve the security of our services we have established this pattern in conjunction with InfoSec.

## Problem statement

To improve security for our staff tools available on the internet we need to be able to: 

- Notice and react to potential attacks that come via web requests
- Log requests to all our services so that they can be centrally audited
- Authenticate external requests before they reach our applications
- Authenticate requests that come from within our network
- Handle authorization and access management to restrict access to specific users

## Recommendation

This solution brings together multiple components to provide a single design pattern with baseline security controls. It is important to note that every applicaiton has its own threat profile and the threat model for certain applications might inform requirements for a higher security baseline and additional security controls implementation

### Authentication at the ALB

For the case where an application is served via an [Application Load Balancer (ALB)](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html) in AWS we will use [authentication at the ALB](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/listener-authenticate-users.html) with Google as an OpenID Connect (OIDC) compliant Identity Provider (IdP). This will require a Google OAuth client to be configured for your application as part of a Google Cloud project. 

This approach allows us to authenticate external requests before they reach our applications.

A proposed extension to this would be this [Cognito authentication proposal](https://docs.google.com/document/d/1bEyL_Hn7DRs7XNyhvjvDK0PGXRzxgFzCbMcnaVyXbA0/edit#heading=h.nchxv8vlw2w5) that provides further custom authentication with Google as an IdP but allows potential access management based on Google groups, and enforces MFA requirements. 

This will remove the requirement to perform authentication within application code and provide a standard way of authenticating all our applications that can easily be [encoded in a GuCDK pattern](https://docs.google.com/document/d/1SfvjNRIzv1bNYRho7s5i_YZv6YyWadp4j9rNOqvpnJg/edit#heading=h.812bucjdpfq7).

**Your application should require Guardian Google organisation membership with 2FA enabled, with the ability to perform tighter access management to a subset of Guardian staff.**

### Web Application Firewall (WAF)

To provide a standard way to recognise and prevent common attacks than can come via web requests we will use AWS WAF [Web Access Control Lists (ACLs)](https://docs.aws.amazon.com/waf/latest/developerguide/web-acl.html). These can be integrated with various AWS solutions including AWS ALBs. See the following [Architecture Decision Record](https://github.com/guardian/waf/blob/main/adr/waf-management.md) for further context.

This solution allows centrally managing Web ACL rules so that they are easily understood, contain an audit trail via source control and can easily be reviewed by InfoSec. In addition this solution can provide a [stream of request events](https://github.com/guardian/waf/blob/bd6fa3a45e9b1892b6207cdd6e8fff27930ca40a/lib/primary-waf.ts#L62) that can be centrally audited.

**Your application should make use of a WAF with centrally managed Web ACL rules provisioned from the https://github.com/guardian/waf repository after review from a member of InfoSec.**

### Authentication & Authorisation at the Application

**Your application, either developed or off the shelf has authentication (verifies the identity of a user or service) and authorization (determines their access rights). The application must carry out these and not rely solely on authentication at the ALB.**

You should use OpenID Connect (OIDC) with Google as an IdP to achieve this. The following mechanisms are acceptable:

- [Verify any access token](https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html) and any claims they contain passed from the ALB during the authentication step.
- Authenticate and authorise the user in your application using an existing auth library such as:
  - Scala: [guardian/play-googleauth](https://github.com/guardian/play-googleauth)
  - Node: [guardian/pan-domain-authentication](https://github.com/guardian/pan-domain-authentication/#to-verify-login-in-nodejs). 

### Authorisation / Access Management

**You should follow the [Principle of Least Privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege), when deciding who has access to your application** and consider the sensitivity of any data or operations your service makes available. For example a service which provides read-only data on what's for lunch in the canteen may be accessed by all Guardian staff, but a service that publishes content to our site must be tightly controlled to a known set of users.

Even if we establish the identity of a user using Google as our IdP, we must further establish that they are a Guardian staff member and in many cases as a member of a specific group of Guardian users.

We can currently enforce as part of configuring an OAuth client in a Google Cloud project that any user authenticated with that client are an internal user, but cannot further restrict access to specific users or Google groups.

> Authentication verifies the identity of a user or service, and authorisation determines their access rights.

Currently there are libraries for common languages mentioned above that allow you to perform access management by restricting Google group: [guardian/play-googleauth](https://github.com/guardian/play-googleauth) (Scala), or [guardian/pan-domain-authentication](https://github.com/guardian/pan-domain-authentication/#to-verify-login-in-nodejs) (Node).  However these solutions require you to encode this logic in your application, and it would be preferable to push this logic into the ALB configuration as discussed in the [Cognito authentication proposal](https://docs.google.com/document/d/1bEyL_Hn7DRs7XNyhvjvDK0PGXRzxgFzCbMcnaVyXbA0/edit#heading=h.nchxv8vlw2w5) above.




