# Snyk (DEPRECATED)

> [!IMPORTANT]
> We recommend using [Github Dependency Graph](https://docs.github.com/en/code-security/supply-chain-security/understanding-your-software-supply-chain/about-the-dependency-graph) and [Dependabot Alerts](https://docs.github.com/en/code-security/dependabot/dependabot-alerts) to analyse dependencies for vulnerabilities.

## Introduction

Snyk is a managed service which uses a dependency analysis tool and a vulnerability database to inform you of
vulnerabilities in your application.

## Getting set up

To access snyk, go to [their website](https://app.snyk.io/login/sso) to sign up via Enterprise SSO. Any other method won't
work and might have adverse consequences.
This also may not work if you are already signed into another Snyk account, so you may need to logout first.

We have an enterprise group called 'The Guardian'. Everyone will get added to the organisation `guardian-people`
(under our enterprise group) when they first log in. Once team members have signed in, they should be added
to other organisations corresponding to teams they are a part of. You will not be able to see organisations you are not a member of.

Developers can be added to a team by a group admin (a few individuals or the InfoSec team) or an admin of the desired
organisation. You will probably also want to upgrade team members from collaborators to admins (in the members
section of the dashboard).

## Integrating Snyk with your project(s)

By far the most effective way to integrate Snyk is through GitHub Actions. Setting up this Action will send a list of
your project's dependencies to snyk.io whenever a new push to `main` takes place. We have created a reusable workflow
that can be used to achieve this, it can be found [here](https://github.com/guardian/.github/tree/main/.github/workflows)
along with usage instructions. Snyk will take this list of dependencies and compare it to a list of vulnerable
dependencies daily. If any new ones are found, team members will be notified by email, and it will show up on the UI as
a vulnerable project. If a patch is available, it will indicate this. A failed action does **not** indicate that your project
is vulnerable, rather that the action was unable to complete. This may be because it can't communicate with snyk's
servers, or perhaps a required plugin has been removed.

This method provides a consistent means for testing the security of our deployed software, but it has a long feedback
loop for identifying vulnerabilities that are introduced during development. For faster feedback, we recommend
developers install the Snyk plugins for their IDEs (available for both IntelliJ and VSCode at the time of writing),
and/or use the PR action, which can be found in the same location as the other workflow above.

## Eliminating Vulnerabilities

The best way to remove a vulnerability is to use a version of the library which does not have the vulnerability.
This is usually achieved by upversioning (or in rarer cases downversioning).

If a secure version of a library is not available and an alternative is not found it is possible to
ignore the vulnerability temporarily. This approach should be used with caution!
Never ignore a vulnerability forever - at least make sure you will be told when a fix is available.

### Examples

Note that examples are all for sbt projects, however nodejs and other projects will be similar.

When you visit a vulnerability report from the output (eg https://snyk.io/vuln/SNYK-JAVA-COMFASTERXMLJACKSONCORE-31573),
you may see a 'Remediation' section at the bottom. If not, you will have to read the text and decide for yourself!

If there is a known non-vulnerable version listed, you can change the dependency declaration as below:

```
$ git diff build.sbt
diff --git a/build.sbt b/build.sbt
index 434dbb2..d123098 100644
--- a/build.sbt
+++ b/build.sbt
@@ -29,7 +29,11 @@ libraryDependencies ++= Seq(
   "org.typelevel" %% "cats" % "0.8.1",
-  "my.library" %% "cleverstuff" % "0.0.99"
+  "my.library" %% "cleverstuff" % "1.0.0"
 )

```

If there is no non-vulnerable version of the library, consider using an alternative.

```
$ git diff build.sbt
diff --git a/build.sbt b/build.sbt
index 434dbb2..d123098 100644
--- a/build.sbt
+++ b/build.sbt
@@ -29,7 +29,11 @@ libraryDependencies ++= Seq(
   "org.typelevel" %% "cats" % "0.8.1",
-  "my.library" %% "quickanddirty" % "0.0.3"
+  "his.library" %% "polished" % "1.1.0+"
 )

```

### Ignoring vulnerabilities

The worst case scenario is that the library is still vulnerable, has no alternatives, and cannot be removed. You
may wish to build and release anyway, ideally reporting the situation to a risk register. This is most likely to happen when
a new vulnerability is discovered and the library publisher has not had chance to respond.

In this case you can create a time-limited exemption by ignoring the vulnerability. The easiest way to do this is from
the Snyk dashboard. Do not ignore vulnerabilities forever, and ideally make sure you will be told when a fix is available.

When an exemption expires, the test will start to fail again (see Reviewing Expired Exemptions below).
If a review still finds no mitigation available, then it is trivial to extend by changing the date and committing.
Therefore repeated exemptions of no more than a month or two are preferred over a single long exemption.

### Reviewing Expired Exemptions

When reviewing previously accepted risks, it would be prudent to examine how long the problem has existed.
If a problem is not fairly new, and still looks unlikely to be resolved, then reconsider both the _risk_ of exploitation and
the _cost_ of exploitation before deciding whether to continue extending an exemption. It may now be
appropriate to consider alternatives.

## Common Vulnerabilities

## Deserialization of Untrusted Data: Jackson Databind

At the time of writing, this vulnerability makes up 74% of our 'high severity' vulnerabilities in Snyk. In the majority
of cases this library is imported as a transitive dependency to our projects rather than being used directly - typically
by the AWS SDK. This makes fixing it more challenging than you might expect, because it requires and AWS SDK upgrade
rather than moving to the latest minor version of the jackson databind library. In some cases it's not possible to fix
this via an AWS SDK upgrade, and you have to override the dependency.

For now, our recommendation is to _focus on other Snyk issues first_. For further info on this, there's a helpful thread
on google chat [here](https://chat.google.com/room/AAAAFug03y8/3p2y42sYhMc) and an in depth blog post about the issue
[here](https://cowtowncoder.medium.com/on-jackson-cves-dont-panic-here-is-what-you-need-to-know-54cd0d6e8062#da96).
