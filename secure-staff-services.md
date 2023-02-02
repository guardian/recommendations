# Securing staff facing services

## Context 

We have a need to make services securely available to both our editorial and engineering staff. In the past we have relied on IP restricting access to internal IP ranges accessible on premises and via VPN by [AWS Security Groups](https://docs.aws.amazon.com/managedservices/latest/userguide/about-security-groups.html).

Restricting access to IP ranges as a method of protecting our tools became impractical after the [network incident at the start of 2023](https://www.theguardian.com/media/2022/dec/21/guardian-hit-by-serious-it-incident-believed-to-be-ransomware-attack). 

In addition the security offered by IP restriction relies on trusting all access from within the network which is less secure than authenticating each users identity with a trusted identity provider.

In order to improve the security of our services, and restore access to previously IP restricted services in the absence of a working VPN we have established the proposed pattern in conjunction for InfoSec.

## Problem statement

To improve security for our staff tools available on the internet we need to be able to: 

- Notice and react to potential attacks that come via web requests
- Log requests to all our services so that they can be centrally audited
- Authenticate external requests before they reach our applications
- Authenticate requests that come from within our network
- Handle authorization and access management to restrict access to specific users

## Proposed solution

This proposal brings together multiple components to provide a single secure solution:

### Authentication at the ALB

For the case where an application is served via an [Application Load Balancer (ALB)](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html) in AWS we propose using [authentication at the ALB](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/listener-authenticate-users.html) with Google as an OpenID Connect (OIDC) compliant Identity Provider (IdP). This will require a Google OAuth client to be configured for your application as part of a Google Cloud project. 

This approach allows us to authenticate external requests before they reach our applications.

A proposed extension to this would be this [Cognito authentication proposal](https://docs.google.com/document/d/1bEyL_Hn7DRs7XNyhvjvDK0PGXRzxgFzCbMcnaVyXbA0/edit#heading=h.nchxv8vlw2w5) that provides further custom authentication with Google as an IdP but allows potential access management based on Google groups, and enforces MFA requirements. 

This will remove the requirement to perform authentication within application code and provide a standard way of authenticating all our applications that can easily be [encoded in a GuCDK pattern](https://docs.google.com/document/d/1SfvjNRIzv1bNYRho7s5i_YZv6YyWadp4j9rNOqvpnJg/edit#heading=h.812bucjdpfq7).

### Web Application Firewall (WAF)

To provide a standard way to recognise and prevent common attacks than can come via web requests we propose using AWS WAF [Web Access Control Lists (ACLs)](https://docs.aws.amazon.com/waf/latest/developerguide/web-acl.html). These can be integrated with various AWS solutions including AWS ALBs. See the following [Architecture Decision Record](https://github.com/guardian/waf/blob/main/adr/waf-management.md) for further context.

This solution allows centrally managing Web ACL rules so that they are easily understood, contain an audit trail via source control and can easily be reviewed by InfoSec. In addition this solution can provide a [stream of request events](https://github.com/guardian/waf/blob/main/lib/primary-waf.ts#L62) that can be centrally audited.

### Authentication at the application

In order to ensure that requests that reach services (EC2 instances or Lambdas) inside our networks we should re-authenticate requests either by validating any tokens generated at the ALB or entirely re-authenticating the user.

Ensuring that we re-authenticate internal requests prevents lateral movement of attacks inside our network should external access be compromised.

This can be done by verifying the token passed from the ALB during the authentication step (no current example) or by re-authenticating the user in the application using an existing auth library such as [guardian/play-googleauth](https://github.com/guardian/play-googleauth) (Scala), or [guardian/pan-domain-authentication](https://github.com/guardian/pan-domain-authentication/#to-verify-login-in-nodejs) (Node). 

In the future we hope to develop a common pattern for verifying tokens from the ALB to prevent the need to re-authenticate at the application.

### Authorisation / Access Management

Even if we establish the identity of a user using Google as our IdP, we must further establish that they are a Guardian staff member and in many cases as a member of a specific group of Guardian users.

We can currently enforce as part of configuring an OAuth client in a Google Cloud project that any user authenticated with that client are an internal user, but cannot further restrict access to specific users or Google groups.

> Authentication verifies the identity of a user or service, and authorisation determines their access rights.

Currently there are libraries for common languages mentioned above that allow you to perform access management by restricting Google group: [guardian/play-googleauth](https://github.com/guardian/play-googleauth) (Scala), or [guardian/pan-domain-authentication](https://github.com/guardian/pan-domain-authentication/#to-verify-login-in-nodejs) (Node).  However these solutions require you to encode this logic in your application, and it would be  to push this logic into the ALB configuration as discussed in the [Cognito authentication proposal](https://docs.google.com/document/d/1bEyL_Hn7DRs7XNyhvjvDK0PGXRzxgFzCbMcnaVyXbA0/edit#heading=h.nchxv8vlw2w5) above.




