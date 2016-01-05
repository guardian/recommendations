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

## Application development

**Keep secrets out of repositories.** Application secrets must not be
stored in version control, even if the repo is "private". To prevent
accidental leakage, files containing secrets should be stored away
from the project, completely outside of the source tree.

**Use the OWASP Security Knowledge Framework**. Before releasing a new
application make sure you run through the Security Knowledge Framework
to get pointers on areas that might need extra attention. Revisit it
from time to time to stay on top of changes in the application and the
team.

## AWS

**Do not use permanent AWS credentials.** Applications running in AWS
should use `assumeRole` to gain access to other AWS resources. For
local development you should use AWS profiles to manage credentials
and these should be temporary credentials (e.g. provided by Janus).

## HTTPS everywhere

**_Everything_ should be served over HTTPS.**

## Personal hygiene

**Disk encryption.** All machines that you do work on must have disk
encryption enabled.

**2FA.** Whenever a service offers 2FA, you should enable it.

**Use a password manager**. Don't reuse simple passwords across
services. A password manager is a good way to help use strong
passwords. The `pwgen` command can be used to generate good passwords,
especially with the `-s` and `-y` flags (`pwgen -sy <length>`).
