# Publishing libraries to Maven Central

[Maven Central](https://central.sonatype.com/), administered by [Sonatype](https://www.sonatype.com/),
is the de-facto artifact repository for JVM-based languages like Scala & Kotlin - for Typescript/JavaScript,
the equivalent would be the [npm Registry](npm-packages.md).

At the Guardian we publish many libraries to Maven Central, and are standardising on reusable automated
GitHub Action release workflows with these aims:

* **achieve zero-onboarding for new developers**: Any developer who has `write` access to a repo should be able
  to publish a release of the library, at the click of a button.
* **securely handle release credentials** - only allow access to release credentials for parts of the release process
  that [_need_](https://github.com/guardian/gha-scala-library-release-workflow/blob/main/docs/security-design.md) them.
* **automated version compatibility checking** - to avoid [binary-incompatibility causing runtime errors](https://github.com/guardian/facia-scala-client/issues/301).
* **reduce per-repo config** - adding library-publishing to a repo should add _minimal_ boilerplate.

## Admin access

As our automated GitHub Action workflows provide all the access that most users need, we have
[very few user accounts](https://docs.google.com/spreadsheets/d/1B_XYsuxNwBuvJ9o72iqgerSeql97bEJw5pT9P5i9A5E/edit?usp=sharing)
with direct admin access to Maven Central/Sonatype. If necessary, see the [docs](https://docs.google.com/document/d/1zA8CHa1a8faemorWokUlbkdexYzpilalqcPFwkRu92M/edit?usp=sharing)
on credential rotation & account recovery.

# Scala libraries

Scala is our most common language for JVM-language artifacts. Any Guardian repo publishing a library
should use [`gha-scala-library-release-workflow`](https://github.com/guardian/gha-scala-library-release-workflow),
which provides many lovely [benefits & features](https://github.com/guardian/gha-scala-library-release-workflow/blob/main/docs/benefits.md).

See [how to configure a repo to use the workflow](https://github.com/guardian/gha-scala-library-release-workflow/blob/main/docs/configuration.md).

# Kotlin libraries

We're working on adopting a similar approach for our Android/Kotlin libraries, see eg:

* https://github.com/guardian/source-apps/pull/10
