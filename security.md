# Security

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

**Keep data only for as long as it is needed** Ensure retention policies are implemented aligned with the requirements set for the type of data you are storing. Use [AWS object life-cycle managemet](https://docs.aws.amazon.com/AmazonS3/latest/dev/object-lifecycle-mgmt.html) whenever possible.

## Application development

**Keep secrets out of repositories.** Application secrets must not be
stored in version control, even if the repo is "private". To prevent
accidental leakage, files containing secrets should be stored away
from the project, completely outside of the source tree.

## AWS

**Do not use permanent AWS credentials.** Applications running in AWS
should use `assumeRole` to gain access to other AWS resources. For
local development you should use AWS profiles to manage credentials
and these should be temporary credentials (e.g. provided by Janus).

**Use Security HQ to get an overview of our AWS accounts.**
Centralised Reporting from AWS services, including Trusted Advisor, is
available in [Security HQ](https://security-hq.gutools.co.uk) and can be
used to monitor the security status of our AWS accounts.

**Use SSM-Scala for SSH access.**
[SSM-scala](https://github.com/guardian/ssm-scala#ssm-scala) is a tool
executing commands on EC2 instances authenticated by IAM credentials.
The SSM Agent is baked into many of our AMI images and should be
preferentially used to permanent keys.

## HTTPS everywhere

**_All_ external endpoints should be served over HTTPS.**

## Personal hygiene

**Disk encryption.** All machines that you do work on must have disk
encryption enabled.

**2FA.** Whenever a service offers 2FA, you should enable it.

**Use a password manager**. Don't reuse simple passwords across
services. A password manager is a good way to help use strong
passwords. The `pwgen` command can be used to generate good passwords,
especially with the `-s` and `-y` flags (`pwgen -sy <length>`).
