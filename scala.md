Scala
-----

 * Always specify an explicit sbt.version
 * Ensure you run in production with GC logging enabled
 * Prefer immutability
 * Prefer the latest version of Scala. At the time of writing `3.1.2` is the latest version, so `2.13.8` may be acceptable. if you are still using `2.12.x` you should plan to migrate.
 * If some dependencies are unavailable for the latest version, it is acceptable to use the latest patch version of the previous minor version but try to avoid it. If you have a dependency that isn't available for one of these versions, it's effectively dead and you should plan how to move away from it.
 * If you come to a codebase using an older version of Scala, it should be upgraded before any new features are added.
 * Run on a Corretto LTS version of Java, no lower than Java 11. At the time of writing this means Corretto 11 or 17. For tips on upgrading from Java 8, see [here](https://docs.google.com/document/d/1ZR-YnaXCT5_gLVmTCeGs0mWd3KPaAozPjQK8uUzHZ9w/edit?usp=sharing).
 * Avoid dependency injection in general.

[Dependency injection](https://en.wikipedia.org/wiki/Dependency_injection) is a software design pattern that implements [inversion of control](https://en.wikipedia.org/wiki/Inversion_of_control) between a `client` and a `service` for resolving dependencies. The term `injection` refers to a third party (named `the injector`) which is responsible for constructing the services and injecting them into the client. Usual `injectors`are dependency injection frameworks such as `guice`, `dagger`, `macwire`, `spring`.

Instead of `injecting` your dependencies, you should simply [pass them as parameters](http://debasishg.blogspot.com/2011/03/pushing-envelope-on-oo-and-functional.html) of functions you are calling. This enable [referential transparency](https://en.wikipedia.org/wiki/Referential_transparency) of your programs.

Most of the time, dependency injection does not solve a real business problem. You don't need to have a single place where you define which concrete instance your trait should be used. This is`accidental complexity`, as coined by Fred Brooks in [No Silver Bullet](https://en.wikipedia.org/wiki/No_Silver_Bullet)

With [The play framework](https://www.playframework.com/) you should always use [compile-time dependency injection](https://www.playframework.com/documentation/2.5.x/ScalaCompileTimeDependencyInjection) which refers to an object oriented way to specify your components declaratively in scala.

If using Play 2.8 and wish to use net.logstash.logback.encoder.LogstashEncoder to output your logs in Java format, you will need to override the version of Jackson used to a later version.
The reason for this is a deeply nested vulnerability in Jackson Databind version 2.11 which Jackson has patched for later versions but not 2.11 (See CVE-2020-36518 - GitHub Advisory Database).
Unfortunately Play 2.8 uses Jackson Databind 2.11 and other Jackson libraries of this version.
Play have said they don't plan to upgrade the Jackson version in Play 2.8 as they are scared of it breaking existing Play applications.
Instead they have recommended adding code to your build sbt to override the Jackson dependencies to a later version:

```
val jacksonVersion         = "2.13.2"   // or 2.12.6
val jacksonDatabindVersion = "2.13.2.2" // or 2.12.6.1

val jacksonOverrides = Seq(
  "com.fasterxml.jackson.core"     % "jackson-core",
  "com.fasterxml.jackson.core"     % "jackson-annotations",
  "com.fasterxml.jackson.datatype" % "jackson-datatype-jdk8",
  "com.fasterxml.jackson.datatype" % "jackson-datatype-jsr310"
).map(_ % jacksonVersion)

val jacksonDatabindOverrides = Seq(
  "com.fasterxml.jackson.core" % "jackson-databind" % jacksonDatabindVersion
)

val akkaSerializationJacksonOverrides = Seq(
  "com.fasterxml.jackson.dataformat" % "jackson-dataformat-cbor",
  "com.fasterxml.jackson.module"     % "jackson-module-parameter-names",
  "com.fasterxml.jackson.module"     %% "jackson-module-scala",
).map(_ % jacksonVersion)

libraryDependencies ++= jacksonDatabindOverrides ++ jacksonOverrides ++ akkaSerializationJacksonOverrides
```

See [this post](ttps://github.com/orgs/playframework/discussions/11222) for more information.
Presumably this code can be stripped out when a new version of Play becomes available, so while it is ugly, it should only be temporary.




