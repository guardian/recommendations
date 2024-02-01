# Scala

 * Always specify an explicit sbt.version
 * Ensure you run in production with GC logging enabled
 * Prefer immutability
 * Prefer the latest version of Scala. At the time of writing `3.1.2` is the latest version, so `2.13.8` may be acceptable. if you are still using `2.12.x` you should plan to migrate.
 * If some dependencies are unavailable for the latest version, it is acceptable to use the latest patch version of the previous minor version but try to avoid it. If you have a dependency that isn't available for one of these versions, it's effectively dead and you should plan how to move away from it.
 * If you come to a codebase using an older version of Scala, it should be upgraded before any new features are added.
 * Run on a Corretto LTS version of Java, no lower than Java 11. At the time of writing this means Corretto 11 or 17. For tips on upgrading from Java 8, see [here](https://docs.google.com/document/d/1ZR-YnaXCT5_gLVmTCeGs0mWd3KPaAozPjQK8uUzHZ9w/edit?usp=sharing).
 * Prefer [passing dependencies as function parameters](http://debasishg.blogspot.com/2011/03/pushing-envelope-on-oo-and-functional.html) over [dependency injection](https://en.wikipedia.org/wiki/Dependency_injection)[^1]. This enable [referential transparency](https://en.wikipedia.org/wiki/Referential_transparency) of your programs.
   

[^1]: Dependency injection is a software design pattern that implements [inversion of control](https://en.wikipedia.org/wiki/Inversion_of_control) between a `client` and a `service` for resolving dependencies. The term `injection` refers to a third party (named `the injector`) which is responsible for constructing the services and injecting them into the client. Usual `injectors`are dependency injection frameworks such as `guice`, `dagger`, `macwire`, `spring`. 
      
      Most of the time, dependency injection does not solve a real business problem. You don't need to have a single place where you define which concrete instance your trait should be used. This is `accidental complexity`, as coined by Fred Brooks in [No Silver Bullet](https://en.wikipedia.org/wiki/No_Silver_Bullet)
      
      With [The play framework](https://www.playframework.com/) you should always use [compile-time dependency injection](https://www.playframework.com/documentation/2.5.x/ScalaCompileTimeDependencyInjection) which refers to an object oriented way to specify your components declaratively in scala.


## Continuous dependency management

Use [Scala Steward](https://github.com/scala-steward-org/scala-steward) to manage the dependencies of your Scala
codebases.  It's important to keep up with changes to dependencies so that when a large-scale security problem occurs
there's no need to do a massive update of multiple dependencies all at once.
Scala Steward works in a similar way to Dependabot, by monitoring a codebase on a schedule and raising a PR whenever
a new version of a dependency becomes available. Here's an 
[example of a generated PR](https://github.com/guardian/identity/pull/2282), showing the dependency changelog
and diff between the version currently in use and the new one.

Scala Steward also makes use of Scalafix code fixups, where they're available, to reduce the workload a little.
This can be of variable benefit. The fix will be applied as a separate commit.
([Example](https://github.com/guardian/identity-admin-api/pull/313))

Once Scala Steward has been integrated into a repo, it's best to get into the habit of testing and either merging or 
closing all the outstanding PRs it has generated before doing any work on the codebase.

Bear in mind that the first run of Scala Steward on an old repo is likely to generate a lot of PRs!
The number of PRs gives an idea of the state of the codebase.
Don't be overwhelmed by it.
Work out a strategy for prioritising updates.
This might be picking off the PRs that only affect the test scope first and then patches, or focusing on a certain
technology area first, or looking for redundant dependencies that could be removed first.
Have a daily target of reducing the number of PRs to a certain level.

### Integration steps

To integrate Scala Steward into a Guardian repo:
1. If the repo is public, add it to our [list of public repos](https://github.com/guardian/scala-steward-public-repos).
   Otherwise, if it's a private repo, add it to the [list of private repos](https://github.com/guardian/scala-steward-private-repos).
   These are separate because GHA workflow runs in public repos are free of charge.
2. If the repo needs
   [custom configuration](https://github.com/scala-steward-org/scala-steward/blob/main/docs/repo-specific-configuration.md),
   add a config file to its root.
   ([Example](https://github.com/guardian/identity-processes/blob/main/.scala-steward.conf)).
   In most cases you won't need to do this but have a look over the available options.
3. GHA workflow runs are scheduled in the 
   [public](https://github.com/guardian/scala-steward-public-repos/blob/main/.github/workflows/public-repos-scala-steward.yml)
   and 
   [private](https://github.com/guardian/scala-steward-private-repos/blob/main/.github/workflows/private-repos-scala-steward.yml)
   repos.
   Have a look over the output of the first run of the workflow after your repo has been added to make sure it is
   successful.
   ([Example](https://github.com/guardian/scala-steward-public-repos/actions/runs/4302760549/jobs/7501659987#step:6:76)) 


### Grouping dependency updates

It can be convenient to merge all the recent updates in a single PR depending on your team practices.  
To do this, add a `pullRequests.grouping` section to the custom config in your repo. ([Example](https://github.com/guardian/typerighter/blob/e18501786f0b6749aecd863e7a949b137390e8a6/.scala-steward.conf#L7-L10)).
Instructions on how to group updates together are 
[here](https://github.com/scala-steward-org/scala-steward/pull/2714).  
Partitioning PRs into a group for frequently updating repos and another group for everything else is under consideration
in the central configuration for the Guardian's Scala-Steward managed repos.


### Dependency migrations

When the group or artifact ID of a dependency changes, it's possible to configure Scala Steward to continue updating it
using the new name.
This feature is documented [here](https://github.com/scala-steward-org/scala-steward/blob/main/docs/artifact-migrations.md).


### Things to consider

* You'll still need to monitor your dependencies to see if any have been abandoned or are no
  longer in use by the codebase.
* The effect of an updated dependency on transitive dependencies can often be surprisingly extensive, occasionally even if it's only a patch update.
* As well as a set of tests that give you confidence at compile time, you'll also need to inspect the effect of the
  update on runtime behaviour, either by automated or manual smoke tests.  You'll save yourself a lot of pain if you can
  do this in an automated way.

It has to be said that all these factors to take into account would apply regardless of the mechanism
you used to manage your dependencies.
