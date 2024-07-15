# Security

As an organisation we have a low information-security risk appetite. We strive
for excellence when protecting the privacy of our readers' data and the 
integrity of our systems. **The security of our applications, 
infrastructure and data is the highest priority.**

This document contains general public security recommendations, for further internal security recommendation see the [guardian/security-recommendations](https://github.com/guardian/security-recommendations) repository.

## Vulnerability management
You should 
[perform due diligence](https://github.com/guardian/security-recommendations/blob/main/recommendations/vulnerability-management.md) 
on your platforms to minimise common vulnerabilities in infrastructure 
and applications. Some of these vulnerabilities are not possible to fix 
automatically, so your team should plan to spend time on addressing them 
on a regular basis. 

More detailed guidance is provided in 
[Security Recommendations](https://github.com/guardian/security-recommendations).

## Sensitive data

**Before building an application think about what (if any) sensitive
data is involved.** Be particularly aware of any personal user data
(including email addresses).

**Have a plan for storing sensitive data safely.** Make sure the ways 
that data can be accessed are well understood. How will you ensure the
data remains safe?

**Limit access to sensitive data.** Only people and services that 
directly depend on the data should be able to access it.

**Keep sensitive data to yourself.** Keep your team's sensitive data 
within the team and under your control. Don't share it with other
teams, don't store it in cookies and don't let it sit in caches.

**Keep data only for as long as it is needed** Ensure retention policies 
are implemented aligned with the requirements set for the type of data 
you are storing. Use 
[AWS object life-cycle management](https://docs.aws.amazon.com/AmazonS3/latest/dev/object-lifecycle-mgmt.html) 
whenever possible.

**Ensure you set the right `Cache-Control` for CDN to not cache your 
response** Using `Cache-Control: no-cache` is NOT sufficient, use 
**`Cache-Control: private`** for this purpose. See 
[Cache-control semantics](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) 
and 
[Fastly config](https://developer.fastly.com/learning/concepts/cache-freshness/#preventing-content-from-being-cached)

**Avoid the use of Personally Identifiable Information (PII) in debug or 
test data.** Representative test data is important, but not at the cost of 
breaching GDPR or disregarding personal privacy preferences.

## Secrets

**Keep secrets out of repositories.** Application secrets must not be
stored in version control, even if the repo is "private". To prevent
accidental leakage, files containing secrets should be stored away
from the project, completely outside the source tree.

**Secrets should be rotated regularly.** Automate the rotation if
possible.

**Some non-secrets should still be kept out of the public domain.** 
"Private" information that does not constitute a secret but may make
an exploit easier to achieve should be kept in private repositories.

Also see the guidance on 
[github repository contents](https://github.com/guardian/recommendations/blob/main/github.md#repository-contents)
