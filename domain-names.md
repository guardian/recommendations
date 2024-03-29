# Domain names

## Which DNS provider should I use?

NS1 is our preferred supplier for DNS hosting. We pay for their dedicated DNS service, which is independent from their shared platform.  This means that even if their shared platform experiences a DDOS attack, our DNS will still be available.

You can cloudform DNS records in NS1 using the Guardian::DNS::RecordSet custom resource ([CDK](https://guardian.github.io/cdk/classes/constructs_dns.GuCname.html) / [Cloudformation](https://github.com/guardian/cfn-private-resource-types/tree/main/dns/guardian-dns-record-set-type/docs) docs). If you have an existing domain that's administered in NS1 and want to migrate it to CDK, see [the EC2 migration docs](https://github.com/guardian/cdk/blob/main/docs/migration-guide-ec2.md#stage-2-switch-dns).

### Avoid Route53

In the past teams have delegated subdomains to Route53, but this approach is no longer recommended. It is now easier to manage DNS records in NS1 as infrastructure-in-code, so the main benefit of Route53 is eroded. Delegating to Route53 introduces an additional point of failure, since NS1 is authoritative for all of our key domain names. It also makes it harder for engineers and future tooling to reason about a domain.

### Exceptions where Route53 might be a good answer

If you have a TLD that isn’t shared (e.g. ophan.co.uk), there is no particular reason not to use Route53.

## Which domain name should I use?

**theguardian.com** should only be used for reader-facing services. TLS termination should be handled by [Fastly](cdn.md) even if your content is not cacheable. This provides many benefits:
* Early support for new protocols (e.g. QUIC)
* Deprecation of old TLS versions
* Prompt deprecation of insecure cipher suites
* Control over what cookies are sent to origin
* Control over Content security policy (CSP) headers

**guardianapis.com** should be used for any system whose users are primarily machines rather than people. It will typically serve JSON or binary protocol rather than HTML. It should never appear in an internal or external user’s address bar. It should not use or set cookies.

**gutools.co.uk** should only be used for internal facing tooling. But this is not limited to editorial tools, and can include marketing, engineering or any other tool with an internal audience.

**guim.co.uk** should only be used for public static assets primarily required by our public facing website and apps.

## Non-production stages

For stages other than PROD we use different domains. This ensures that PROD is completely isolated (e.g. cookies will be separate).

| Production domain | Pre-production structure     | Code domain                |
|-------------------|------------------------------|----------------------------|
| theguardian.com   | [stage].dev-theguardian.com  | code.dev-theguardian.com   |
| guardianapis.com  | [stage].dev-guardianapis.com | code.dev-guardianapis.ccom |
| gutools.co.uk     | [stage].dev-gutools.co.uk    | code.dev-gutools.co.uk     |
| guim.co.uk        | Does not follow rule         | guimcode.co.uk             |